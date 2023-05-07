import React from "react";
import { Text, View, StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
  },
});

const MyStack = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>a</Text>
        <Text>a</Text>
        <StatusBar animated={true} barStyle="dark-content" />
      </View>
    </>
  );
};

export default MyStack;
