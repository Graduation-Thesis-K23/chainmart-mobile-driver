import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import {
  ErrorPayload,
  OrderProductType,
  OrderStatus,
  Payment,
} from "../../shared";

import instance from "../../services/axios-instance";

export interface Address {
  phone: string;
  name: string;
  district: string;
  city: string;
  ward: string;
  street: string;
  id?: string;
}

export interface OrderType {
  id: string;
  address: Address;
  packaged_date: Date;
  status: OrderStatus;
  payment: Payment;
  order_details: OrderProductType[];
}

export interface WaitingState {
  data: OrderType[];
  status: (typeof ASYNC_STATUS)[keyof typeof ASYNC_STATUS];
}

const initialState: WaitingState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const waitingOrders = createSlice({
  name: "waiting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWaitingOrders.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchWaitingOrders.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;

      const newOrders = action.payload.filter((order) => {
        return !state.data.some((item) => item.id === order.id);
      });

      state.data = [...state.data, ...newOrders];
    });
    builder.addCase(fetchWaitingOrders.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
      state.data = [];
    });
    builder.addCase(confirmOrder.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(confirmOrder.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = state.data.filter((order) => order.id !== action.payload.id);
    });
    builder.addCase(confirmOrder.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const fetchWaitingOrders = createAsyncThunk(
  "orders/fetchWaitingOrders",
  async (page: number, thunkApi) => {
    const queries = new URLSearchParams({
      status: OrderStatus.Packaged,
      page: page.toString(),
    }).toString();

    const response: OrderType[] | ErrorPayload = await instance.get(
      "/api/orders/shipper?" + queries
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export const confirmOrder = createAsyncThunk(
  "orders/confirmOrder",
  async (id: string, thunkApi) => {
    const response: OrderType | ErrorPayload = await instance.patch(
      "/api/orders/" + id + "/shipper/started"
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default waitingOrders.reducer;
