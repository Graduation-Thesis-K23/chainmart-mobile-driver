import { createSlice } from "@reduxjs/toolkit";

export const drawerSlide = createSlice({
  name: "drawer",
  initialState: false,
  reducers: {
    showDrawer: () => true,
    hideDrawer: () => false,
  },
});

export const { showDrawer, hideDrawer } = drawerSlide.actions;

export default drawerSlide.reducer;
