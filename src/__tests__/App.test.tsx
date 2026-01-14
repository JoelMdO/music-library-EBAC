import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import App from "../App";
import { songsMock } from "../__mocks__/songs";
import type { Store } from "@reduxjs/toolkit/react";

// Mock the thunk so it returns a plain action we can assert on
jest.mock("../redux/thunks/fetchSongThunk", () => ({
  fetchSongs: jest.fn((query: string) => ({
    type: "FETCH_SONGS_MOCK",
    payload: query,
  })),
}));

// Mock sweetalert2 mixin used by SongDetail
jest.mock("sweetalert2", () => ({
  mixin: jest.fn(() => ({
    fire: jest.fn(),
  })),
}));

if (typeof window.matchMedia === "undefined") {
  // Minimal matchMedia mock for jsdom
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

describe("App e2e flow: search -> details -> add -> library", () => {
  it("searches, opens SongDetail, saves song, and shows it in Library", () => {
    // initial store shape
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let state: any = {
      search: { artist: "", results: {} },
      library: { songs: [] },
    };

    const listeners: Array<() => void> = [];

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

    const mockStore = {
      getState: () => state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch: jest.fn((action: any) => {
        if (!action) return action;
        if (action.type === "FETCH_SONGS_MOCK") {
          state = {
            ...state,
            search: {
              artist: action.payload,
              results: buildResultsFromSongs(songsMock),
            },
          };
          listeners.forEach((l) => l());
        }
        if (action.type === "search/filterResults") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const filtered: Record<string, { tracks: any[] }> = {};
          Object.keys(state.search.results).forEach((album) => {
            const matches = state.search.results[album].tracks.filter(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (t: any) =>
                t.strTrack
                  .toLowerCase()
                  .includes(String(action.payload).toLowerCase())
            );
            if (matches.length) filtered[album] = { tracks: matches };
          });
          state = {
            ...state,
            search: { ...state.search, filterSongs: filtered },
          };
          listeners.forEach((l) => l());
        }
        if (action.type === "library/addSong") {
          state = {
            ...state,
            library: { songs: [...state.library.songs, action.payload] },
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
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Header exists on Home
    expect(
      screen.getByRole("heading", { name: "My Music Library" })
    ).toBeInTheDocument();

    // Type into search input and submit
    const input = screen.getByPlaceholderText(/Artist/i);
    fireEvent.change(input, { target: { value: "Nirvana" } });
    expect(input).toHaveValue("Nirvana");

    const submitBtn = screen.getByTitle(/submit/i);
    fireEvent.click(submitBtn);

    // After mocked fetch, select should appear
    const select = screen.getByTitle(/Select a song/i) as HTMLSelectElement;
    expect(select).toBeInTheDocument();

    // Choose first song
    const first = songsMock[0];
    const value = JSON.stringify({ album: first.album, track: first.title });
    fireEvent.change(select, { target: { value } });

    // SongDetail should render (it shows a title 'Detalles de la canción')
    expect(screen.getByText(/Detalles de la canción/i)).toBeInTheDocument();

    // Add to library
    const addBtn = screen.getByTitle(/Agregar a la biblioteca/i);
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);

    // Ensure store.dispatch was called with library/addSong
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "library/addSong" })
    );

    // Navigate back to home using the back button in SongDetail
    const backBtn = screen.getByLabelText(/regresar/i);
    fireEvent.click(backBtn);

    // Now Library should show the saved song title and artist (filter by element selector to avoid matching the <option>)
    const libTitle = screen.getByText(new RegExp(first.title, "i"), {
      selector: "h4.library-song_title",
    });
    const libArtist = screen.getByText(new RegExp(first.artist, "i"), {
      selector: "p.library-song_artist",
    });
    expect(libTitle).toBeInTheDocument();
    expect(libArtist).toBeInTheDocument();
  });
});
