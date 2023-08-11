import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  ASYNC_STATUS,
  fetchCancelledOrders,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import Indicator from "../../components/common/Indicator";
import convertPrice from "../../helpers/convert-price";
import withAuth from "../../hocs/withAuth";
import { useFocusEffect } from "@react-navigation/native";
import Empty from "../../components/Empty";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  item: {
    backgroundColor: "#ffffff",
    boxShadow: "2px 2px 10px 2px rgba(70, 59, 59, 0.75)",
    marginTop: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  address: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  contact: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  confirmBtn: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#2da85c",
    padding: 10,
  },
});

const OrdersCancelled = () => {
  const [page, setPage] = useState(1);

  console.log("OrdersCancelled", page);

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.cancelled);

  const dataRender = data.map((item) => ({
    id: item.id,
    status: item.status,
    address: `${item.address.street}, ${item.address.ward}, ${item.address.city}, ${item.address.district}`,
    totalPrice: convertPrice(
      item.order_details.reduce(
        (total, product) => total + product.product.price * product.quantity,
        0
      )
    ),
    cancelled_date: new Date(item.cancelled_date).toLocaleString("vi-VN", {
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
    }),
  }));

  const handleLoadMore = async () => {
    await dispatch(fetchCancelledOrders(page + 1));
    setPage((prev) => prev + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchCancelledOrders(page));
      return () => {
        setPage(1);
      };
    }, [])
  );

  if (status === ASYNC_STATUS.IDLE || status === ASYNC_STATUS.LOADING)
    <Indicator />;

  return (
    <View style={styles.container}>
      <FlatList
        data={dataRender}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.header}>
              <Text>Cancelled At:</Text>
              <Text>{item.cancelled_date}</Text>
            </View>
            <View style={styles.header}>
              <Text>Order Status:</Text>
              <Text>{item.status}</Text>
            </View>
            <View style={styles.address}>
              <Text>Order Address:</Text>
              <Text
                style={{
                  marginTop: 10,
                }}
              >
                {item.address}
              </Text>
            </View>
            <View style={styles.price}>
              <Text>Total Price: </Text>
              <Text>{item.totalPrice}</Text>
            </View>
          </View>
        )}
        inverted={true}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Empty text="No orders have failed to deliver." />}
      />
    </View>
  );
};

export default withAuth(OrdersCancelled);
