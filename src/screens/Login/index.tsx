import React from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import logo from "../../assets/icon.png";

import Form from "./Form";
import { ASYNC_STATUS, useAppSelector } from "../../redux";
import Indicator from "../../components/common/Indicator";

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: ScreenHeight,
    width: ScreenWidth,
  },
  logo: {
    marginTop: 40,
    width: 200,
    height: 66,
  },
});

const Login = () => {
  const user = useAppSelector((state) => state.user);

  if (user.status === ASYNC_STATUS.LOADING) {
    return <Indicator />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Form />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
