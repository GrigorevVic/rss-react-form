import { configureStore } from "@reduxjs/toolkit";
import formReducer from './slice';


export const store = configureStore({
    reducer: {
        form: formReducer
    }
});

export type RootState = ReturnType<typeof store.getState>