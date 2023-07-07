import React, { Fragment, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ASYNC_STATUS,
  fetchCancelledOrders,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import Indicator from "../../components/common/Indicator";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

const OrdersCancelled = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.cancelled);

  useEffect(() => {
    dispatch(fetchCancelledOrders());
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

export default OrdersCancelled;
