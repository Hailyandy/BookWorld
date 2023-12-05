import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userService from "~/services/user.service";
import adminService from "~/services/admin.service";
import authorService from "~/services/author.service";
import tokenService from "~/services/token.service";
//friendReqList,userInfo
const initialState = tokenService.getUser() ? { userInfo: { ...tokenService.getUser() }, friendReqList: [] } : { friendReqList: [] };

export const loginAsync = createAsyncThunk(
    "users/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const res = await userService.login({ username, password });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            return rejectWithValue(err.response.data)
        }
    }
);
export const registerAsync = createAsyncThunk(
    "users/register",
    async ({ username, password, roles }, { rejectWithValue }) => {

        try {
            const res = await userService.signup({ username, password, roles });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            return rejectWithValue(err.response.data)
        }

    }
);

export const sendOtpConfirmationAsync = createAsyncThunk(
    "users/otpconfirmation",
    async ({ username, otp }, { rejectWithValue }) => {

        try {
            const res = await userService.confirmEmailByOtp({ username, otp });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            return rejectWithValue(err.response.data)
        }
    }
);

export const resendOtpConfirmationAsync = createAsyncThunk(
    "users/resendotpconfirmation",
    async ({ username }, { rejectWithValue }) => {

        try {
            const res = await userService.resendOtp({ username });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getListFriendRequest = createAsyncThunk(
    "users/getListFriendRequest",
    async (param, { rejectWithValue }) => {

        try {
            const res = await userService.getListFriendRequest();
            console.log(res)
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getListFriend = createAsyncThunk(
    "users/getListFriend",
    async (param, { rejectWithValue }) => {

        try {
            const res = await userService.getListFriend();
            console.log(res)
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const searchUserByName = createAsyncThunk(
    "users/searchUserByName",
    async ({ name }, { rejectWithValue }) => {

        try {
            const res = await userService.getUserByName({ name });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const addFriend = createAsyncThunk(
    "users/addFriend",
    async ({ receiverId }, { rejectWithValue }) => {
        try {
            const res = await userService.addFriend({ receiverId });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const unFriend = createAsyncThunk(
    "users/unFriend",
    async ({ senderId }, { rejectWithValue }) => {
        try {
            const res = await userService.unfriend({ senderId });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const acceptFriendReq = createAsyncThunk(
    "users/acceptFriend",
    async ({ senderId }, { rejectWithValue }) => {
        try {
            const res = await userService.acceptFriendReq({ senderId });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const rejectFriendReq = createAsyncThunk(
    "users/rejectFriend",
    async ({ senderId }, { rejectWithValue }) => {
        try {
            const res = await userService.rejectFriendReq({ senderId });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);


export const getAllMyBook = createAsyncThunk(
    "users/allMyBook",
    async (param, { rejectWithValue }) => {
        try {
            const res = await userService.getAllMyBook();
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);
// export const followPeople = createAsyncThunk(
//     "users/followFriend",
//     async ({ name }, { rejectWithValue }) => {

//         try {
//             const res = await userService.followPeople({ name });
//             return res.data;
//         } catch (err) {
//             // Use `err.response.data` as `action.payload` for a `rejected` action,
//             // by explicitly returning it using the `rejectWithValue()` utility
//             console.log(err)
//             return rejectWithValue(err.response.data)
//         }
//     }
// );

export const rateBookOrUploadFileAsync = createAsyncThunk(
    "users/allMyBook",
    async ({ bookId, scoring, content }, { rejectWithValue }) => {
        try {
            const res = await userService.rateBookOrUploadFile({ bookId, scoring, content });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const get50TopBookAsync = createAsyncThunk(
    "users/allMyBook",
    async (param, { rejectWithValue }) => {
        try {
            const res = await userService.get50TopBook();
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getAllReportPdfAsync = createAsyncThunk(
    "admin/allReportPdf",
    async (param, { rejectWithValue }) => {
        try {
            const res = await adminService.getAllReportPdf();
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getAllPostAsync = createAsyncThunk(
    "user/getAllPost",
    async (param, { rejectWithValue }) => {
        try {
            const res = await userService.getAllPost();
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getAllSuggestBookAsync = createAsyncThunk(
    "user/getAllPost",
    async (param, { rejectWithValue }) => {
        try {
            const res = await userService.getAllSuggestBook();
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getListQuizByBookIdAsync = createAsyncThunk(
    "user/getListQuizByBookId",
    async ({ idBook }, { rejectWithValue }) => {
        try {
            const res = await authorService.getListQuizByBookId({ idBook });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);
export const getAllAuthorsAsync = createAsyncThunk(
    "admin/getAllAuthors",
    async (param, { rejectWithValue }) => {
        try {
            const res = await adminService.getAllAuthor();
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);


export const addNewBookAsync = createAsyncThunk(
    "admin/addNewBook",
    async ({
        name,
        numberPages,
        publisher,
        publishDate,
        introducing,
        urlPoster,
        authorId,
        genreIds,

    }, { rejectWithValue }) => {
        try {
            const res = await adminService.addNewBook({
                name,
                numberPages,
                publisher,
                publishDate,
                introducing,
                urlPoster,
                authorId,
                genreIds,

            },);
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const createQuestionAsync = createAsyncThunk(
    "author/getAllPost",
    async ({ idBook, questionDtos }, { rejectWithValue }) => {
        try {
            const res = await authorService.createQuestion({ idBook, questionDtos });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const checkAnswerAndGetPointAsync = createAsyncThunk(
    "admin/getAllAuthors",
    async ({ idBook, listAnswer }, { rejectWithValue }) => {
        try {
            const res = await authorService.checkAnswerAndGetPoint({ idBook, listAnswer });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const addPdfForABookAsync = createAsyncThunk(
    "users/addPdfForABook",
    async ({ idBook, urlPdf }, { rejectWithValue }) => {
        try {
            const res = await userService.addPdfForABook({ idBook, urlPdf });
            return res.data;
        } catch (err) {
            // Use `err.response.data` as `action.payload` for a `rejected` action,
            // by explicitly returning it using the `rejectWithValue()` utility
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);


export const createCommentAsync = createAsyncThunk(
    'comments/createComment',
    async ({ content, postId, parentId }, { rejectWithValue }) => {
        try {
            const data = await userService.createComment({ content, postId, parentId });
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getCommentOfPostAsync = createAsyncThunk(
    'comments/getCommentOfPost',
    async ({ postId }, { rejectWithValue }) => {
        try {
            const data = await userService.getCommentOfPost({ postId });
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getUserPostListAsync = createAsyncThunk(
    'posts/getUserPostList',
    async ({ userId }, { rejectWithValue }) => {
        try {
            const data = await userService.getUserPostList({ userId });
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const createReportAboutPdfAsync = createAsyncThunk(
    'pdf/createReportAboutPdf',
    async ({ reason, description, pdf_id }, { rejectWithValue }) => {
        try {
            const data = await userService.createReportAboutPdf({ reason, description, pdf_id });
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getListBookOfAuthorAsync = createAsyncThunk(
    'author/getListBookOfAuthor',
    async (param, { rejectWithValue }) => {
        try {
            const data = await authorService.getListBookOfAuthor();
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getUserTopScoreByBookIdAsync = createAsyncThunk(
    'user/getListBookOfAuthor',
    async ({ idBook }, { rejectWithValue }) => {
        try {
            const data = await userService.getUserTopScoreByBookId({ idBook });
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // add your non-async reducers here
        logout: (state) => {
            tokenService.removeUser()
            state.userInfo = ''
            state.friendReqList = []
        },
    },
    extraReducers: {
        [loginAsync.fulfilled]: (state, action) => {
            state.userInfo = action.payload
            console.log(state.userInfo)
            // await getListFriendRequest()
        },
        [registerAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
        [sendOtpConfirmationAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
        [resendOtpConfirmationAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
        [getListFriendRequest.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.friendReqList = action.payload ? action.payload : []
        },
        [acceptFriendReq.fulfilled]: (state, action) => {
            console.log(state.friendReqList)
        },
        [rejectFriendReq.fulfilled]: (state, action) => {
            console.log(state.friendReqList)
        },
        [getListFriend.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
        [getAllMyBook.fulfilled]: (state, action) => {
            console.log(action.payload)
        },

        [rateBookOrUploadFileAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
        [get50TopBookAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
        [getAllReportPdfAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
        [addNewBookAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
    },
});
const { reducer } = userSlice;
export const { logout } = userSlice.actions;
export default reducer;
