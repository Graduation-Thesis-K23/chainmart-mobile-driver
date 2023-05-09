import React from "react";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";

import { store } from "./redux";
import Navigator from "./screens/Navigator";

const styles = StyleSheet.create({
  statusBar: {
    flex: 0,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.content}>
        <StatusBar barStyle="light-content" />
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
