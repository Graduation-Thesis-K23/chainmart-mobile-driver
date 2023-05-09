import React, { FC } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { primaryColor } from "../../colors";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    backgroundColor: primaryColor,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "white",
  },
});

const Button: FC<{
  onPress: () => void;
  title: string;
  style?: object;
}> = ({ onPress, title = "Submit" }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default Button;
