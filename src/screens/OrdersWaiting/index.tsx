import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  ASYNC_STATUS,
  confirmOrder,
  fetchWaitingOrders,
  useAppDispatch,
  useAppSelector,
} from "../../redux";
import Indicator from "../../components/common/Indicator";
import convertPrice from "../../helpers/convert-price";
import withAuth from "../../hocs/withAuth";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: "#ddd",
  },
  item: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
    marginTop: 10,
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

const OrdersWaiting = () => {
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.waiting);

  const dataRender = data.map((item) => ({
    id: item.id,
    status: item.status,
    address: `${item.address.street}, ${item.address.ward}, ${item.address.city}, ${item.address.district}`,
    totalPrice: convertPrice(
      item.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    ),
    sendAt: new Date(item.approved_date).toLocaleString("vi-VN", {
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
    }),
  }));

  const handleLoadMore = async () => {
    await dispatch(fetchWaitingOrders(page + 1));
    setPage((prev) => prev + 1);
  };

  const handleConfirmOrder = async (id: string) => {
    const result = await dispatch(confirmOrder(id));

    if (confirmOrder.fulfilled.match(result)) {
      Alert.alert("Confirm order successfully");
    } else {
      Alert.alert(result.payload as string);
    }
  };

  useEffect(() => {
    dispatch(fetchWaitingOrders(page));
  }, []);

  if (status === ASYNC_STATUS.IDLE || status === ASYNC_STATUS.LOADING)
    <Indicator />;

  return (
    <View style={styles.container}>
      <FlatList
        data={dataRender}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.header}>
              <Text>Received At:</Text>
              <Text>{item.sendAt}</Text>
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
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => handleConfirmOrder(item.id)}
            >
              <Text
                style={{
                  color: "#fff",
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        )}
        inverted={true}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
      />
    </View>
  );
};

export default withAuth(OrdersWaiting);
