import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { toggleTheme } from "../store/themeSlice";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  return (
    <View style={styles.row}>
      <Text>{isDark ? "Dark" : "Light"} Mode</Text>
      <Switch
        value={isDark}
        onValueChange={(value: boolean) => {
          dispatch(toggleTheme());
        }}
      />
    </View>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
});
