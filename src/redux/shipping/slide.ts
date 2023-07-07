import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import { ErrorPayload } from "../../shared";
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
  },
});

export const fetchShippingOrders = createAsyncThunk(
  "orders/fetchShippingOrders",
  async (_, thunkApi) => {
    const response: OrderShippingType[] | ErrorPayload = await new Promise(
      (resolve) => {
        resolve(OrdersShipping);
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default shippingOrders.reducer;
