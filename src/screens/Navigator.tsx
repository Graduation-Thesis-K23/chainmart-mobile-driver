import React from "react";

import LoginScreen from "./Login";
import HomeScreen from "./Home";

import { useAppSelector, ASYNC_STATUS } from "../redux";

const Navigator = () => {
  const user = useAppSelector((state) => state.user);

  if (user.status === ASYNC_STATUS.IDLE) return <LoginScreen />;

  return <HomeScreen />;
};

export default Navigator;
