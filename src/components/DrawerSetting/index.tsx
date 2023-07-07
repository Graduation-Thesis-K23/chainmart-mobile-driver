import React, { FC } from "react";
import { Text } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { hideDrawer, showDrawer, useAppSelector } from "../../redux";

const DrawerSetting: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const drawer = useAppSelector((state) => state.drawer);

  return (
    <Drawer
      open={drawer}
      onOpen={showDrawer}
      onClose={hideDrawer}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}
      drawerPosition="right"
    >
      {children}
    </Drawer>
  );
};

export default DrawerSetting;
