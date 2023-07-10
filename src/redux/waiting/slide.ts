import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import {
  ErrorPayload,
  OrderProductType,
  OrderStatus,
  Payment,
} from "../../shared";
import OrdersWaiting from "../../mocks/waiting";
import { OrderShippingType } from "../shipping";

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
  approved_date: number;
  status: OrderStatus;
  payment: Payment;
  products: OrderProductType[];
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
      state.data.push(...action.payload);
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
    const newOrders: OrderType[] = OrdersWaiting.map((order) => ({
      ...order,
      id: Math.random().toString(36),
    }));

    const response: OrderType[] | ErrorPayload = await new Promise(
      (resolve) => {
        resolve(newOrders);
      }
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
    console.log("confirmOrder", id);
    const order = OrdersWaiting.find((order) => order.id === id);

    if (!order) {
      return thunkApi.rejectWithValue("Order not found");
    }

    const response: OrderShippingType | ErrorPayload = await new Promise(
      (resolve) => {
        resolve({
          ...order,
          shipped_date: Date.now(),
        });
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default waitingOrders.reducer;
