import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SearchState } from "../../types/songs_types";
import { fetchSongs } from "../thunks/fetchSongThunk";

const initialState: SearchState = {
  results: {},
  loading: false,
  error: null,
  artist: "",
  filterSongs: {},
};

// Create a slice for search
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    //Reset search results
    resetResults: () => initialState,
    artist: (state, action: PayloadAction<string>) => {
      state.artist = action.payload;
    },
    filterResults: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      const filteredResults: SearchState["results"] = {};

      Object.keys(state.results).forEach((album) => {
        const tracks = state.results[album].tracks.filter((track) =>
          track.strTrack.toLowerCase().includes(searchTerm)
        );

        if (tracks.length > 0) {
          filteredResults[album] = { tracks };
        }
      });
      state.filterSongs = filteredResults;
    },
  },
  extraReducers: (builder) => {
    ///--------------------------------------------------------
    // ExtraReducers:
    // Configura extraReducers para manejar los estados del thunk:
    ///--------------------------------------------------------
    builder
      // pending: Cambia loading a true y limpia error.
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      //fulfilled: Almacena los datos obtenidos en results y cambia loading a false.
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      //rejected: Almacena el mensaje de error en error.
      .addCase(fetchSongs.rejected, (state, action) => {
        state.error = action.payload?.message || "Error fetching songs";
        state.loading = false;
      });
  },
});

// Export actions
export const { resetResults, artist, filterResults } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
