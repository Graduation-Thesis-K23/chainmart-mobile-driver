import React from "react";
import { StyleSheet, Text, View } from "react-native";
import withAuth from "../../hocs/withAuth";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default withAuth(Home);
