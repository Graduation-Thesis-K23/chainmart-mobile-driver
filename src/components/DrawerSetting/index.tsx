import React, { FC } from "react";
import { Drawer } from "react-native-drawer-layout";
import { hideDrawer, showDrawer, useAppSelector } from "../../redux";
import Setting from "../../screens/Setting";

const DrawerSetting: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const drawer = useAppSelector((state) => state.drawer);

  return (
    <Drawer
      open={drawer}
      onOpen={showDrawer}
      onClose={hideDrawer}
      renderDrawerContent={() => <Setting />}
      drawerPosition="right"
    >
      {children}
    </Drawer>
  );
};

export default DrawerSetting;
