import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SongsTypes } from "../types/songs_types";

interface LibraryState {
  songs: SongsTypes[];
}

const initialState: LibraryState = {
  songs: [],
};

// Create a slice for guides
export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addSong: (state, action: PayloadAction<SongsTypes>) => {
      state.songs.push({ ...action.payload });
    },
    removeSong: (state, action: PayloadAction<number>) => {
      state.songs = state.songs.filter((_, index) => index !== action.payload);
    },
  },
});

// Export actions
export const { addSong, removeSong } = librarySlice.actions;
export const libraryReducer = librarySlice.reducer;
