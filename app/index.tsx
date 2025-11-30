import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { loadUserFromStorage } from "../store/authSlice";
import { router } from "expo-router";

const Index = () => {
  const dispatch = useAppDispatch();
  const { user, authChecked } = useAppSelector((s) => s.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  useEffect(() => {
    if (!authChecked) return;

    if (!user) {
      router.replace("/login");
    } else {
      if (user.type?.toUpperCase() === "ADMIN") {
        router.replace("/admin_profile");
      } else {
        router.replace("/profile");
      }
    }
  }, [authChecked, user]);

  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
