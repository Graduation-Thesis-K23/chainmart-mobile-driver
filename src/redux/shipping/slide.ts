import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import { ErrorPayload, SuccessPayload } from "../../shared";
import OrdersShipping from "../../mocks/shipping";
import { OrderType } from "../waiting";

export interface OrderShippingType extends OrderType {
  shipped_date: number;
}

export interface ShippingState {
  data: OrderShippingType[];
  status: (typeof ASYNC_STATUS)[keyof typeof ASYNC_STATUS];
}

const initialState: ShippingState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
};

export const shippingOrders = createSlice({
  name: "shipping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShippingOrders.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(fetchShippingOrders.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = action.payload;
    });
    builder.addCase(fetchShippingOrders.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(cancelOrder.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = state.data.filter((order) => order.id !== action.payload);
    });
    builder.addCase(cancelOrder.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
    builder.addCase(completedOrder.pending, (state) => {
      state.status = ASYNC_STATUS.LOADING;
    });
    builder.addCase(completedOrder.fulfilled, (state, action) => {
      state.status = ASYNC_STATUS.SUCCEED;
      state.data = state.data.filter((order) => order.id !== action.payload);
    });
    builder.addCase(completedOrder.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const fetchShippingOrders = createAsyncThunk(
  "orders/fetchShippingOrders",
  async (page: number, thunkApi) => {
    console.log("fetchShippingOrders", page);

    const newOrders = OrdersShipping.map((order) => ({
      ...order,
      id: Math.random().toString(36),
      shipped_date: Date.now(),
    }));

    const response: OrderShippingType[] | ErrorPayload = await new Promise(
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

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrders",
  async (id: string, thunkApi) => {
    console.log("cancelOrders", id);

    const response: SuccessPayload | ErrorPayload = await new Promise(
      (resolve) => {
        resolve({
          status: "success",
        });
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(id);
  }
);

export const completedOrder = createAsyncThunk(
  "orders/completedOrders",
  async (id: string, thunkApi) => {
    const response: SuccessPayload | ErrorPayload = await new Promise(
      (resolve) => {
        resolve({
          status: "success",
        });
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response.message);
    }

    return thunkApi.fulfillWithValue(id);
  }
);

export default shippingOrders.reducer;
