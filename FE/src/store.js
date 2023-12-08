import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './slices/book';
import userReducer from './slices/user';

const reducer = {
    books: bookReducer,
    users: userReducer,

}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;
