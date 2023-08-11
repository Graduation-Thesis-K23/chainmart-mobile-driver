import React, { memo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scaleY: -1 }],
    width: "100%",
    height: ScreenHeight,
  },
});

const Empty: React.FC<{
  text?: string;
}> = ({ text = "Data is empty" }) => (
  <View style={styles.view}>
    <Text>{text}</Text>
  </View>
);

export default memo(Empty);
