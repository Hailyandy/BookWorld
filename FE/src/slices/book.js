import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "~/services/book.service";
import BookService from "~/services/book.service";
const initialState = [];

export const searchBookByNameOrAuthor = createAsyncThunk(
    "books/searchByNameOrAuthor",
    async ({ name, param }) => {
        // console.log(name)
        console.log(param)
        const res = await BookService.searchBookByNameOrAuthor({ name }, param);
        return res.data;
    }
);

export const searchBookByIdAsync = createAsyncThunk(
    "books/searchByNameOrAuthor",
    async ({ id }) => {
        const res = await BookService.searchBookById({ id });
        return res.data;
    }
);

export const followBookAndUpdateStatusAsync = createAsyncThunk(
    "users/followBookAndUpdateStatus",
    async ({ bookId, status }, { rejectWithValue }) => {

        try {
            const res = await bookService.followBookAndUpdateStatus({ bookId, status });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getAllGenresBookAsync = createAsyncThunk(
    "users/getAllGenresBook",
    async (param, { rejectWithValue }) => {

        try {
            const res = await bookService.getAllGenresBook();
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);
const bookSlice = createSlice({
    name: "tutorial",
    initialState,
    reducers: {
        // add your non-async reducers here
        searchBookById: (state) => {
            // tokenService.removeUser()
            // state.userInfo = ''
        },

    },
    extraReducers: {
        [searchBookByNameOrAuthor.fulfilled]: (state, action) => {
            console.log(action.payload)
        },

        [searchBookByIdAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
        },

    },
});

const { reducer } = bookSlice;
export const { searchBookById } = bookSlice.actions;
export default reducer;
