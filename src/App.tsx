import React from "react";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { loadAsync } from "expo-font";

import { store } from "./redux";
import Navigation from "./components/Navigation";

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
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const init = async () => {
      await loadAsync({
        Ionicons: require("./assets/fonts/Ionicons.ttf"),
      });

      setIsReady(true);
    };

    init();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.statusBar} />
      <SafeAreaView style={styles.content}>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
