import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import SearchResults from "../components/search_results";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom";
import { fetchSongs } from "../redux/thunks/fetchSongThunk";
import { songsMock } from "../__mocks__/songs";
import { type Store } from "@reduxjs/toolkit/react";
import SongDetail from "../components/song_detail";

// Mock the thunk so it returns a plain action we can assert on
jest.mock("../redux/thunks/fetchSongThunk", () => ({
  fetchSongs: jest.fn((query: string) => ({
    type: "FETCH_SONGS_MOCK",
    payload: query,
  })),
}));

// Mock sweetalert2 mixin to avoid window.matchMedia issues in jsdom
jest.mock("sweetalert2", () => ({
  mixin: jest.fn(() => ({
    fire: jest.fn(),
  })),
}));

// Provide a minimal matchMedia mock for jsdo
if (typeof window.matchMedia === "undefined") {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

describe("Search Component", () => {
  it("renders the input", () => {
    const simpleState = { search: { artist: "", results: {} } };
    const simpleStore = {
      getState: () => simpleState,
      dispatch: jest.fn(),
      subscribe: () => () => {},
      replaceReducer: () => {},
    } as unknown as Store;

    render(
      <Provider store={simpleStore}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Artist/i);
    expect(input).toBeInTheDocument();
  });

  it("allows typing into the input", () => {
    const simpleState = { search: { artist: "", results: {} } };
    const simpleStore = {
      getState: () => simpleState,
      dispatch: jest.fn(),
      subscribe: () => () => {},
      replaceReducer: () => {},
    } as unknown as Store;

    render(
      <Provider store={simpleStore}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Artist/i);
    fireEvent.change(input, { target: { value: "Nirvana" } });
    expect(input).toHaveValue("Nirvana");
  });

  test("Retrieves the results, each song shows a title, artist name and album name from fetchSongs", () => {
    // Build initial state with empty search and library
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let initialState: any = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      search: { artist: "", results: {} as any },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      library: { songs: [] as any[] },
    };
    const listeners: Array<() => void> = [];

    // Helper to convert songsMock into results shape used by the component
    const buildResultsFromSongs = (songs: typeof songsMock) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const results: Record<string, { tracks: any[] }> = {};
      songs.forEach((s) => {
        if (!results[s.album]) results[s.album] = { tracks: [] };
        results[s.album].tracks.push({
          strTrack: s.title,
          strArtist: s.artist,
        });
      });
      return results;
    };

    // Store mock handles fetch, filter and library add actions
    const mockStore = {
      getState: () => initialState,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch: jest.fn((action: any) => {
        if (!action) return action;
        // Mocked fetchSongs action
        if (action.type === "FETCH_SONGS_MOCK") {
          initialState = {
            ...initialState,
            search: {
              artist: action.payload,
              results: buildResultsFromSongs(songsMock),
            },
          };
          listeners.forEach((l) => l());
        }
        // filterResults reducer action type is 'search/filterResults'
        if (action.type === "search/filterResults") {
          // action.payload is the track name; create filterSongs with matching track
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const filtered: any = {};
          Object.keys(initialState.search.results).forEach((album) => {
            const matches = initialState.search.results[album].tracks.filter(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (t: any) =>
                t.strTrack
                  .toLowerCase()
                  .includes(String(action.payload).toLowerCase())
            );
            if (matches.length) filtered[album] = { tracks: matches };
          });
          initialState = {
            ...initialState,
            search: { ...initialState.search, filterSongs: filtered },
          };
          listeners.forEach((l) => l());
        }
        // library addSong action type is 'library/addSong'
        if (action.type === "library/addSong") {
          initialState = {
            ...initialState,
            library: { songs: [...initialState.library.songs, action.payload] },
          };
          listeners.forEach((l) => l());
        }
        return action;
      }),
      // subscribe pushes listeners
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      subscribe: (listener: any) => {
        listeners.push(listener);
        return () => {
          const idx = listeners.indexOf(listener);
          if (idx > -1) listeners.splice(idx, 1);
        };
      },
      replaceReducer: () => {},
    } as unknown as Store;

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Artist/i);
    const button = screen.getByRole("button");
    fireEvent.change(input, { target: { value: "Nirvana" } });
    expect(input).toHaveValue("Nirvana");
    fireEvent.click(button);

    expect(fetchSongs).toHaveBeenCalledWith("Nirvana");
    // Verify that the <select> exists in the document
    const select = screen.getByTitle(/Select a song/i);
    expect(select).toBeInTheDocument();

    // Verify the songs at select are render correctly.
    // as: `Album: {album}, Track: {strTrack}`
    songsMock.forEach((song) => {
      const option = screen.getByText(
        new RegExp(`Album: ${song.album}, Track: ${song.title}`, "i")
      );
      expect(option).toBeInTheDocument();
    });

    // Simulate selecting the first song to navigate to SongDetail and set filterSongs
    const first = songsMock[0];
    const selectEl = screen.getByTitle(/Select a song/i) as HTMLSelectElement;
    const value = JSON.stringify({ album: first.album, track: first.title });
    fireEvent.change(selectEl, { target: { value } });

    // Now render SongDetail with the same store so it reads state.search.filterSongs
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <SongDetail />
        </MemoryRouter>
      </Provider>
    );

    // The add button in SongDetail has title "Agregar a la biblioteca"
    const addButton = screen.getByTitle(/Agregar a la biblioteca/i);
    expect(addButton).toBeInTheDocument();

    // Click it and assert library state updated
    fireEvent.click(addButton);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "library/addSong" })
    );
    // library mock should now contain the added song
    const lib = mockStore.getState().library;
    expect(lib.songs).toHaveLength(1);
    expect(lib.songs[0]).toMatchObject({
      title: first.title,
      artist: first.artist,
    });
  });
});
