import React from "react";

import Login from "./Login";
import Home from "./Home";

import { useAppSelector } from "~redux";
import { ASYNC_STATUS } from "~redux/constants";

const Navigator = () => {
  const user = useAppSelector((state) => state.user);

  if (user.status === ASYNC_STATUS.IDLE) return <Login />;

  return <Home />;
};

export default Navigator;
