import React from "react";
import { Image, StyleSheet } from "react-native";

import logo from "../../assets/logo.png";

const styles = StyleSheet.create({
  logo: {
    marginTop: 40,
    width: 200,
    height: 66,
  },
});

const Logo = () => <Image style={styles.logo} source={logo} />;

export default Logo;
