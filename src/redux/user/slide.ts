import { createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";

export interface User {
  name: string;
  email: number;
  role: string;
  avatar: string;
  username: string;
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
});

export default userSlide.reducer;
