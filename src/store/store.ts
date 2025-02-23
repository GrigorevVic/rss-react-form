import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formDataSlice";
import { countriesSlice } from "./countriesSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
    countries: countriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
