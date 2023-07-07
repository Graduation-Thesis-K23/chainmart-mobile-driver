import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, Role } from "../../shared";

export interface User {
  name: string;
  role: string;
  photo: string;
  username: string;
  token: string;
  phone: string;
}

export interface UserSignInPayload {
  username: string;
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.status = ASYNC_STATUS.FAILED;
      state.message = action.payload as string;
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
  },
});

export const signIn = createAsyncThunk(
  "user/signIn",
  async (payload: UserSignInPayload, thunkAPI) => {
    await AsyncStorage.setItem("token", "token");

    const response: User | ErrorPayload = await new Promise((resolve) => {
      resolve({
        username: payload.username,
        phone: "09123412345",
        name: "Nguyen Van Shipper",
        photo: "https://picsum.photos/200",
        token: "token",
        role: Role.Shipper,
      });
    });

    if ("message" in response) {
      return thunkAPI.rejectWithValue(response.message);
    }

    return thunkAPI.fulfillWithValue(response);
  }
);

export const checkToken = createAsyncThunk(
  "user/checkToken",
  async (_, thunkAPI) => {
    const token = (await AsyncStorage.getItem("token")) || "";

    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }

    const response: User | ErrorPayload = await new Promise((resolve) => {
      resolve({
        username: "shipper",
        phone: "09123412345",
        name: "Nguyen Van Shipper",
        photo: "https://picsum.photos/200",
        token: token,
        role: Role.Shipper,
      });
    });

    if ("message" in response) {
      return thunkAPI.rejectWithValue(response.message);
    }

    return thunkAPI.fulfillWithValue(response);
  }
);

export default userSlide.reducer;
