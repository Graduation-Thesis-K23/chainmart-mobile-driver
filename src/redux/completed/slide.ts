import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import { ErrorPayload } from "../../shared";
import OrdersCompleted from "../../mocks/completed";
import { OrderType } from "../waiting";

export interface OrderCompletedType extends OrderType {
  shipped_date: number;
}

export interface CompletedState {
  data: OrderType[];
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
      state.data = action.payload;
    });
    builder.addCase(fetchCompletedOrders.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const fetchCompletedOrders = createAsyncThunk(
  "orders/fetchCompletedOrders",
  async (_, thunkApi) => {
    const response: OrderCompletedType[] | ErrorPayload = await new Promise(
      (resolve) => {
        resolve(OrdersCompleted);
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default completedOrders.reducer;
