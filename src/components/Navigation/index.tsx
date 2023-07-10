import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import OrdersWaiting from "../../screens/OrdersWaiting";
import OrdersShipping from "../../screens/OrdersShipping";
import OrdersCompleted from "../../screens/OrderCompleted";
import DrawerSetting from "../../components/DrawerSetting";
import OrderCancelled from "../../screens/OrderCancelled";
import { showDrawer, useAppDispatch, useAppSelector } from "../../redux";

const Tab = createBottomTabNavigator();

const renderIcon = (name: string, focused: boolean) => {
  if (focused) {
    switch (name) {
      case "Waiting":
        return "ios-cube";
      case "Shipping":
        return "ios-bicycle";
      case "Completed":
        return "ios-checkmark-circle";
      case "Cancelled":
        return "ios-close-circle";
      default:
        return "ios-information-circle";
    }
  } else {
    switch (name) {
      case "Waiting":
        return "ios-cube-sharp";
      case "Shipping":
        return "ios-bicycle-outline";
      case "Completed":
        return "ios-checkmark-circle-outline";
      case "Cancelled":
        return "ios-close-circle-outline";
      default:
        return "ios-information-circle-outline";
    }
  }
};

const styles = StyleSheet.create({
  tabBarBadgeStyle: {
    transform: [{ scale: 0.5 }],
  },
});

const Navigation = () => {
  const dispatch = useAppDispatch();
  const waitingLength = useAppSelector((state) => state.waiting.data.length);
  const shippingLength = useAppSelector((state) => state.shipping.data.length);

  const handleOpenDrawer = () => {
    dispatch(showDrawer());
  };

  return (
    <DrawerSetting>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const iconName = renderIcon(route.name, focused);
              return (
                <Icon
                  name={iconName}
                  size={focused ? size : size / 1.25}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: "#2da85c",
            tabBarInactiveTintColor: "#aaa",
            headerBackground: () => (
              <View style={{ backgroundColor: "#2da85c" }} />
            ),
          })}
        >
          <Tab.Screen
            name="Waiting"
            component={OrdersWaiting}
            options={{
              tabBarBadge: waitingLength,
              tabBarBadgeStyle: styles.tabBarBadgeStyle,
              headerTitleStyle: {
                color: "#fff",
              },
              headerBackgroundContainerStyle: {
                backgroundColor: "#2da85c",
              },
              headerTitleAlign: "left",
              headerRight: () => (
                <TouchableOpacity onPress={handleOpenDrawer}>
                  <Icon
                    name="ios-menu"
                    size={30}
                    color="#fff"
                    onPress={handleOpenDrawer}
                    style={{
                      marginRight: 10,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Shipping"
            component={OrdersShipping}
            options={{
              tabBarBadge: shippingLength,
              tabBarBadgeStyle: styles.tabBarBadgeStyle,
              headerTitleStyle: {
                color: "#fff",
              },
              headerTitleAlign: "left",
              headerBackgroundContainerStyle: {
                backgroundColor: "#2da85c",
              },
              headerRight: () => (
                <TouchableOpacity onPress={handleOpenDrawer}>
                  <Icon
                    name="ios-menu"
                    size={30}
                    color="#fff"
                    onPress={handleOpenDrawer}
                    style={{
                      marginRight: 10,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Completed"
            component={OrdersCompleted}
            options={{
              headerTitleAlign: "left",
              headerTitleStyle: {
                color: "#fff",
              },
              headerBackgroundContainerStyle: {
                backgroundColor: "#2da85c",
              },
              headerRight: () => (
                <TouchableOpacity onPress={handleOpenDrawer}>
                  <Icon
                    name="ios-menu"
                    size={30}
                    color="#fff"
                    onPress={handleOpenDrawer}
                    style={{
                      marginRight: 10,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Cancelled"
            component={OrderCancelled}
            options={{
              headerBackgroundContainerStyle: {
                backgroundColor: "#2da85c",
              },
              headerTitleStyle: {
                color: "#fff",
              },
              headerTitleAlign: "left",
              headerRight: () => (
                <TouchableOpacity onPress={handleOpenDrawer}>
                  <Icon
                    name="ios-menu"
                    size={30}
                    color="#fff"
                    onPress={handleOpenDrawer}
                    style={{
                      marginRight: 10,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </DrawerSetting>
  );
};

export default Navigation;
