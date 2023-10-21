import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BookService from "~/services/book.service";
const initialState = [];

export const searchBookByNameOrAuthor = createAsyncThunk(
    "books/searchByNameOrAuthor",
    async ({ name }) => {
        const res = await BookService.searchBookByNameOrAuthor({ name });
        return res.data;
    }
);



const bookSlice = createSlice({
    name: "tutorial",
    initialState,
    extraReducers: {
        [searchBookByNameOrAuthor.fulfilled]: (state, action) => {
            console.log(action.payload)
        },

    },
});

const { reducer } = bookSlice;
export default reducer;
