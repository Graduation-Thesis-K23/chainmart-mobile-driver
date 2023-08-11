import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import {
  ASYNC_STATUS,
  cancelOrder,
  completedOrder,
  fetchShippingOrders,
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
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
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
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  cancelBtn: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#bbb",
    padding: 10,
    width: "22%",
  },
  callBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "30%",
    backgroundColor: "#2da85c",
  },
  viewProductBtn: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
});

const OrdersShipping = () => {
  const [page, setPage] = useState(1);

  console.log("OrdersShipping", page);

  const [showNumber, setShowNumber] = useState(-1);

  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.shipping);

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
    phone: item.address.phone,
    products: item.order_details.map((product) => ({
      id: product.id,
      name: product.product.name,
      price: convertPrice(product.product.price),
      quantity: product.quantity,
    })),
    started_date: new Date(item.started_date).toLocaleString("vi-VN", {
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
    }),
  }));

  const handleLoadMore = async () => {
    await dispatch(fetchShippingOrders(page + 1));
    setPage(page + 1);
  };

  const handlePressCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleCancelOrder = async (id: string) => {
    const result = await dispatch(cancelOrder(id));

    if (cancelOrder.fulfilled.match(result)) {
      Alert.alert("Cancel order successfully");
    } else {
      Alert.alert("Cancel order failed");
    }
  };

  const handleDoneOrder = async (id: string) => {
    const result = await dispatch(completedOrder(id));

    if (completedOrder.fulfilled.match(result)) {
      Alert.alert("Completed order successfully");
    } else {
      Alert.alert("Completed order failed");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchShippingOrders(page));

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
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <View style={styles.header}>
              <Text>Begin Ship At:</Text>
              <Text>{item.started_date}</Text>
            </View>
            <View style={styles.header}>
              <Text>Order Status:</Text>
              <Text>SHIPPING</Text>
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
            <View style={styles.contact}>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => handlePressCall(item.phone)}
              >
                <Icon name="ios-call" size={16} color="#fff" />
                <Text
                  style={{
                    color: "#fff",
                    marginLeft: 5,
                  }}
                >
                  Call
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => handleCancelOrder(item.id)}
              >
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => handleDoneOrder(item.id)}
              >
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            {showNumber !== index ? (
              <TouchableOpacity
                style={styles.viewProductBtn}
                onPress={() => setShowNumber(index)}
              >
                <Text
                  style={{
                    color: "#aaa",
                    marginRight: 5,
                  }}
                >
                  Products Detail
                </Text>
                <Icon name="ios-chevron-down" size={16} color="#aaa" />
              </TouchableOpacity>
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      width: 24,
                    }}
                  >
                    ID
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                    }}
                  >
                    Name
                  </Text>
                  <Text
                    style={{
                      width: 86,
                    }}
                  >
                    Price
                  </Text>
                  <Text
                    style={{
                      width: 20,
                    }}
                  >
                    QT
                  </Text>
                </View>
                {item.products.map((product, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderTopColor: "#ddd",
                      borderTopWidth: 1,
                    }}
                    key={product.id}
                  >
                    <Text
                      style={{
                        width: 20,
                      }}
                    >
                      {index + 1}
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                      }}
                    >
                      {product.name}
                    </Text>
                    <Text
                      style={{
                        width: 86,
                      }}
                    >
                      {product.price}
                    </Text>
                    <Text
                      style={{
                        width: 20,
                      }}
                    >
                      {product.quantity}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
        inverted={true}
        keyExtractor={(item) => item.id}
        onEndReached={handleLoadMore}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Empty text="No orders currently being delivered." />
        }
      />
    </View>
  );
};

export default withAuth(OrdersShipping);
