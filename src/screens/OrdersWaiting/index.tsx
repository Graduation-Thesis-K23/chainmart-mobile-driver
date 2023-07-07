import React, { Fragment, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ASYNC_STATUS,
  fetchWaitingOrders,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import Indicator from "../../components/common/Indicator";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

const OrdersWaiting = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.waiting);

  useEffect(() => {
    dispatch(fetchWaitingOrders());
  }, []);

  if (status === ASYNC_STATUS.IDLE || status === ASYNC_STATUS.LOADING)
    <Indicator />;

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <Fragment key={item.id}>
          <Text>{item.status}</Text>
        </Fragment>
      ))}
    </View>
  );
};

export default OrdersWaiting;
