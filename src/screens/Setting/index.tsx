import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  useAppDispatch,
  logout,
  useAppSelector,
  hideDrawer,
} from "../../redux";
import photo from "../../assets/user.jpg";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  logoutBtn: {
    padding: 10,
    marginBottom: 20,
    marginLeft: 20,
  },
  photo: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "#000",
    borderWidth: 3,
  },
});

const Setting = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.user);

  const handleLogout = async () => {
    dispatch(hideDrawer());
    await dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image style={styles.photo} source={photo} />
        <Text
          style={{
            marginTop: 20,
            fontSize: 24,
          }}
        >
          {data?.name}
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontSize: 18,
          }}
        >
          {data?.phone}
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text
            style={{
              color: "#2da85c",
              fontWeight: "600",
              fontSize: 22,
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Setting;
