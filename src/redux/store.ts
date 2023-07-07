import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { userReducer } from "./user";
import { drawerReducer } from "./drawer";
import { waitingReducer } from "./waiting";
import { shippingReducer } from "./shipping";
import { completedReducer } from "./completed";
import { cancelledReducer } from "./cancelled";

const store = configureStore({
  reducer: {
    user: userReducer,
    drawer: drawerReducer,
    waiting: waitingReducer,
    shipping: shippingReducer,
    completed: completedReducer,
    cancelled: cancelledReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
