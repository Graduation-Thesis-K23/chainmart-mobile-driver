import React, { FC, useEffect } from "react";

import { checkToken, useAppDispatch, useAppSelector } from "../redux";
import { ASYNC_STATUS } from "../redux";
import Indicator from "../components/common/Indicator";
import LoginScreen from "../screens/Login";

const withAuth = (Component: FC) => {
  const AuthenticatedComponent = () => {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (user.status === ASYNC_STATUS.IDLE) {
        dispatch(checkToken());
      }
    }, [dispatch, user.status]);

    if (
      user.status === ASYNC_STATUS.IDLE ||
      user.status === ASYNC_STATUS.LOADING
    ) {
      return <Indicator />;
    }

    if (user.status === ASYNC_STATUS.FAILED) {
      return <LoginScreen />;
    }

    return <Component />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
