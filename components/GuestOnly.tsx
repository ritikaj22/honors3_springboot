import React, { ReactNode, useEffect } from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "../hooks/reduxHooks";

const GuestOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user) {
      if (user.type?.toUpperCase() === "ADMIN") {
        router.replace("/admin_profile");
      } else {
        router.replace("/profile");
      }
    }
  }, [authChecked, user]);

  if (!authChecked) {
    return <Text>Loading...</Text>;
  }

  return <>{children}</>;
};

export default GuestOnly;
