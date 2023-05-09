import React from "react";
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Logo from "./Logo";
import Form from "./Form";

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: ScreenHeight,
    width: ScreenWidth,
  },
});

const Login = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Logo />
        <Form />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
