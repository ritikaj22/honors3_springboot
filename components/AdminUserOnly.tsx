import React, { ReactNode, useEffect } from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "../hooks/reduxHooks";

const AdminUserOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (authChecked) {
      if (!user) {
        router.replace("/login");
      } else if (user.type?.toUpperCase() !== "ADMIN") {
        router.replace("/profile");
      }
    }
  }, [authChecked, user]);

  if (!authChecked) {
    return <Text>Loading...</Text>;
  }

  if (!user || user.type?.toUpperCase() !== "ADMIN") return null;

  return <>{children}</>;
};

export default AdminUserOnly;
