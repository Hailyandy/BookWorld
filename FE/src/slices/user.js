import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userService from "~/services/user.service";
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
            state.friendReqList = action.payload

        },
        [acceptFriendReq.fulfilled]: (state, action) => {
            console.log(state.friendReqList)
        },
        [rejectFriendReq.fulfilled]: (state, action) => {
            console.log(state.friendReqList)
        },
    },
});
const { reducer } = userSlice;
export const { logout } = userSlice.actions;
export default reducer;
