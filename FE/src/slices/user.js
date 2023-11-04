import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userService from "~/services/user.service";
const initialState = [];

export const login = createAsyncThunk(
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
export const register = createAsyncThunk(
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

export const sendOtpConfirmation = createAsyncThunk(
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

export const resendOtpConfirmation = createAsyncThunk(
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


// user information
export const inforUser = createAsyncThunk(
    "users/inforParticipation",
    async ({ username, dateOfBirth, sex, phoneNumber, role }, { rejectWithValue }) => {
        try {
            const res = await userService.inforUser({ username, dateOfBirth, sex, phoneNumber, role});
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);



const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
        [register.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
        [sendOtpConfirmation.fulfilled]: (state, action) => {
            console.log(action.payload)
        },
        [inforUser.fulfilled]: (state, action) => {
            console.log(action.payload)
        }
    },
});

const { reducer } = userSlice;
export default reducer;
