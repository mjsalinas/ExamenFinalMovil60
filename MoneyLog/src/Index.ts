import { configureStore } from "@reduxjs/toolkit";
//importar reducer con alias
import booksReducer from "./Slices/ExpensesSlice"


export const store = configureStore({
    reducer:{
        books:booksReducer               
    },
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch;
