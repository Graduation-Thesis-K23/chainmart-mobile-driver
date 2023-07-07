import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import {
  ErrorPayload,
  OrderProductType,
  OrderStatus,
  Payment,
} from "../../shared";
import OrdersWaiting from "../../mocks/waiting";

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
      state.data = action.payload;
    });
    builder.addCase(fetchWaitingOrders.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const fetchWaitingOrders = createAsyncThunk(
  "orders/fetchWaitingOrders",
  async (_, thunkApi) => {
    const response: OrderType[] | ErrorPayload = await new Promise(
      (resolve) => {
        resolve(OrdersWaiting);
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default waitingOrders.reducer;
