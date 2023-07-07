import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ASYNC_STATUS } from "../constants";
import { ErrorPayload } from "../../shared";
import OrdersCancelled from "../../mocks/cancelled";
import { OrderType } from "../waiting";

export interface OrderCancelledType extends OrderType {
  shipped_date: number;
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
      state.data = action.payload;
    });
    builder.addCase(fetchCancelledOrders.rejected, (state) => {
      state.status = ASYNC_STATUS.FAILED;
    });
  },
});

export const fetchCancelledOrders = createAsyncThunk(
  "orders/fetchCancelledOrders",
  async (_, thunkApi) => {
    const response: OrderCancelledType[] | ErrorPayload = await new Promise(
      (resolve) => {
        resolve(OrdersCancelled);
      }
    );

    if ("message" in response) {
      return thunkApi.rejectWithValue(response);
    }

    return thunkApi.fulfillWithValue(response);
  }
);

export default cancelledOrders.reducer;
