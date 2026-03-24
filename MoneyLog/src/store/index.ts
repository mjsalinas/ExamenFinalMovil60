
import { configureStore } from "@reduxjs/toolkit";
//importar Reducer con alias 
import booksReducer from "./slices/expenseSlice";

export const store = configureStore({
    reducer: {
        books: booksReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
