import { configureStore } from "@reduxjs/toolkit";
import { libraryReducer } from "./librarySlice";
import { searchReducer } from "./slices/searchSlice";
// Configure the store
const store = configureStore({
  reducer: {
    library: libraryReducer,
    search: searchReducer,
  },
});

// Export the store and types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
