import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BookService } from "~/services/book.service";
const initialState = [];

export const createTutorial = createAsyncThunk(
    "books/create",
    async ({ title, description }) => {
        const res = await BookService.add({ title, description });
        return res.data;
    }
);

export const retrieveTutorials = createAsyncThunk(
    "books/retrieve",
    async () => {
        const res = await BookService.getAll();
        return res.data;
    }
);

export const updateTutorial = createAsyncThunk(
    "books/update",
    async ({ id, data }) => {
        const res = await BookService.put(id, data);
        return res.data;
    }
);

export const deleteTutorial = createAsyncThunk(
    "books/delete",
    async ({ id }) => {
        await BookService.delete(id);
        return { id };
    }
);

export const deleteAllTutorials = createAsyncThunk(
    "books/deleteAll",
    async () => {
        const res = await BookService.delete('1');
        return res.data;
    }
);

// export const findTutorialsByTitle = createAsyncThunk(
//     "books/findByTitle",
//     async ({ title }) => {
//         const res = await BookService.findByTitle(title);
//         return res.data;
//     }
// );

const bookSlice = createSlice({
    name: "tutorial",
    initialState,
    extraReducers: {
        [createTutorial.fulfilled]: (state, action) => {
            state.push(action.payload);
        },
        [retrieveTutorials.fulfilled]: (state, action) => {
            return [...action.payload];
        },
        [updateTutorial.fulfilled]: (state, action) => {
            const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
            state[index] = {
                ...state[index],
                ...action.payload,
            };
        },
        [deleteTutorial.fulfilled]: (state, action) => {
            let index = state.findIndex(({ id }) => id === action.payload.id);
            state.splice(index, 1);
        },
        [deleteAllTutorials.fulfilled]: (state, action) => {
            return [];
        },
        // [findTutorialsByTitle.fulfilled]: (state, action) => {
        //     return [...action.payload];
        // },
    },
});

const { reducer } = bookSlice;
export default reducer;
