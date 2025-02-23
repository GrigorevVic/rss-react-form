import { createSlice } from "@reduxjs/toolkit";

const slise = createSlice({
  name: "form",
  initialState: {form: {}},
  reducers: {
    addDataForm(state, action) {
      state.form = action.payload;
    },
  },
});

export const { addDataForm } = slise.actions;

export default slise.reducer;
