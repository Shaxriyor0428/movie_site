import { createSlice } from "@reduxjs/toolkit";
const savedInitialState = {
  value: [],
};
const savedSlice = createSlice({
  name: "saved",
  initialState: savedInitialState,

  reducers: {
    savedMovies(state, action) {
      state.value.push(action.payload);
      // localStorage.setItem("saved", state.value);
    },
  },
});

export const { savedMovies } = savedSlice.actions;
export default savedSlice.reducer;
