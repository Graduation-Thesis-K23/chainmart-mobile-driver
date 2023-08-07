import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, OrderStatus } from "../../shared";
import { OrderType } from "../waiting";
import instance from "../../services/axios-instance";

export interface OrderCancelledType extends OrderType {
  cancelled_date: number;
}
export interface CancelledState {
  data: OrderCancelledType[];
  status: (typeof ASYNC_STATUS)[keyof typeof ASYNC_STATUS];
}

const initialState: CancelledState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const cancelledOrders = createSlice({
  name: "cancelled",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCancelledOrders.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchCancelledOrders.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      // check id order is exist
      const newOrders = action.payload.filter((order) => {
        return !state.data.some((item) => item.id === order.id);
      });

      state.data = [...state.data, ...newOrders];
    });
    builder.addCase(fetchCancelledOrders.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const fetchCancelledOrders = createAsyncThunk(
  "orders/fetchCancelledOrders",
  async (page: number, thunkApi) => {
    const queries = new URLSearchParams({
      status: OrderStatus.Cancelled,
      page: page.toString(),
    }).toString();

    const response: OrderCancelledType[] | ErrorPayload = await instance.get(
      "/api/orders/shipper?" + queries
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default cancelledOrders.reducer;
