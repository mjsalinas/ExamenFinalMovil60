import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Book{
    name: string;
    author: string;
    genre: string;
    rating: string;
    publishDate: string;
}

//const initialState:Book={
  //  name: "",
    //author: "",
    //genre: "",
    //rating: "",
    //publishDate: ""
//}

interface BooksState{
    books: Book[],
    
};

const initialState:BooksState={
    books:[],
    book:{
        name: "",
        author: "",
        genre: "",
        rating: "",
        publishDate: ""
    }
    
};

const bookSlice=createSlice({
    name:'book',
    initialState,
    reducers:{
        
        addBook:(State,action:PayloadAction<Book>)=>{
            State.books.push(action.payload)
        },

        clearBook:()=>initialState,
    },
});

//exportar actions
export const {addBook,clearBook}=bookSlice.actions;

//exportar el reducer de book como default
export default bookSlice.reducer;