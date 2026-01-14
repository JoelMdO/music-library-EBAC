import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Library from "../components/library";
import { libraryReducer } from "../redux/librarySlice";
import { songsMock } from "../__mocks__/songs";

describe("Library component", () => {
  test("shows empty library message when no songs are saved", () => {
    const store = configureStore({
      reducer: { library: libraryReducer },
      preloadedState: { library: { songs: [] } },
    });

    render(
      <Provider store={store}>
        <Library />
      </Provider>
    );

    expect(
      screen.getByText("Your music collection is empty.")
    ).toBeInTheDocument();
  });

  test("shows added song and removes it when trash button is clicked", () => {
    const store = configureStore({
      reducer: { library: libraryReducer },
      preloadedState: { library: { songs: [songsMock[0]] } },
    });

    render(
      <Provider store={store}>
        <Library />
      </Provider>
    );

    // The song added via the mock store should be visible
    expect(screen.getByText(songsMock[0].title)).toBeInTheDocument();

    // There should be a trash button with the aria-label defined in the component
    const trashButton = screen.getByLabelText(/borrar cancion del store/i);
    fireEvent.click(trashButton);

    // After clicking the trash button the song should be removed
    expect(screen.queryByText(songsMock[0].title)).not.toBeInTheDocument();
    expect(
      screen.getByText("Your music collection is empty.")
    ).toBeInTheDocument();
  });
});
