import React from "react";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { smsStore } from "../store/store";

export default function RootLayout() {
  return (
    <Provider store={smsStore}>
      <Slot />
    </Provider>
  );
}
