import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import type { Store } from "redux";
import SearchResults from "../components/search_results";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom";
import { fetchSongs } from "../redux/thunks/fetchSongThunk";

// Mock the thunk so it returns a plain action we can assert on
jest.mock("../redux/thunks/fetchSongThunk", () => ({
  fetchSongs: jest.fn((query: string) => ({
    type: "FETCH_SONGS_MOCK",
    payload: query,
  })),
}));

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

  it("retrieves results and shows a select after search", () => {
    // state that will be mutated by mock dispatch
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let state = { search: { artist: "", results: {} as any } };
    const listeners: Array<() => void> = [];

    const mockStore = {
      getState: () => state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch: jest.fn((action: any) => {
        if (action && action.type === "FETCH_SONGS_MOCK") {
          state = {
            ...state,
            search: {
              artist: action.payload,
              results: {
                "Mock Album": {
                  tracks: [{ strTrack: "Smells like Teen Spirit" }],
                },
              },
            },
          };
          listeners.forEach((l) => l());
        }
        return action;
      }),
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

    // fetchSongs should have been called
    expect(fetchSongs).toHaveBeenCalledWith("Nirvana");

    // After dispatch the component should re-render and the select should appear
    const select = screen.getByTitle(/Select a song/i);
    expect(select).toBeInTheDocument();
    // Check that the option contains the album and track
    expect(select).toHaveTextContent(
      "Album: Mock Album, Track: Smells like Teen Spirit"
    );
  });
});
