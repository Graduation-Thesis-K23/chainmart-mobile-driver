import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, OrderStatus } from "../../shared";
import { OrderType } from "../waiting";
import instance from "../../services/axios-instance";

export interface OrderCompletedType extends OrderType {
  completed_date: number;
}

export interface CompletedState {
  data: OrderCompletedType[];
  status: (typeof ASYNC_STATUS)[keyof typeof ASYNC_STATUS];
}

const initialState: CompletedState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const completedOrders = createSlice({
  name: "completed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompletedOrders.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchCompletedOrders.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data.push(...action.payload);
    });
    builder.addCase(fetchCompletedOrders.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const fetchCompletedOrders = createAsyncThunk(
  "orders/fetchCompletedOrders",
  async (page: number, thunkApi) => {
    const queries = new URLSearchParams({
      status: OrderStatus.Completed,
      page: page.toString(),
    }).toString();

    const response: OrderCompletedType[] | ErrorPayload = await instance.get(
      "/api/orders/shipper?" + queries
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default completedOrders.reducer;
