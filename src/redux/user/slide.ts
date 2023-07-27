import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ASYNC_STATUS } from "../constants";
import { ErrorPayload } from "../../shared";
import instance from "../../services/axios-instance";

export interface User {
  name: string;
  role: string;
  photo: string;
  token: string;
  phone: string;
}

export interface UserSignInPayload {
  phone: string;
  password: string;
}

export interface UserState {
  data: User;
  status: (typeof ASYNC_STATUS)[keyof typeof ASYNC_STATUS];
  message: string;
}

const initialState: UserState = {
  data: {} as unknown as User,
  status: ASYNC_STATUS.IDLE,
  message: "",
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = ASYNC_STATUS.FAILED;
      state.message = action.payload as string;
    });
    builder.addCase(signIn.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(checkToken.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(checkToken.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
    builder.addCase(checkToken.rejected, (state, action) => {
      state.status = ASYNC_STATUS.FAILED;
      state.message = action.payload as string;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.data = {} as unknown as User;
      state.status = ASYNC_STATUS.IDLE;
    });
  },
});

export const signIn = createAsyncThunk(
  "user/signIn",
  async (payload: UserSignInPayload, thunkAPI) => {
    const response: User | ErrorPayload = await instance.post(
      "/api/auth-shipper/sign-in",
      payload
    );

    if ("message" in response) {
      return thunkAPI.rejectWithValue(response.message);
    }

    await AsyncStorage.setItem("token", response.token);
    return thunkAPI.fulfillWithValue(response);
  }
);

export const checkToken = createAsyncThunk(
  "user/checkToken",
  async (_, thunkAPI) => {
    const response: User | ErrorPayload = await instance.get(
      "/api/auth-shipper/check-token"
    );

    if ("message" in response) {
      return thunkAPI.rejectWithValue(response.message);
    }

    return thunkAPI.fulfillWithValue(response);
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  await AsyncStorage.removeItem("token");
  return thunkAPI.fulfillWithValue({});
});

export const { setMessage } = userSlide.actions;

export default userSlide.reducer;
