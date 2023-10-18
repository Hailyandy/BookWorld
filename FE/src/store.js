import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './slices/book';

const reducer = {
    books: bookReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;
