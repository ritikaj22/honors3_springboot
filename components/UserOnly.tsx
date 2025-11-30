import React, { ReactNode, useEffect } from "react";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "../hooks/reduxHooks";

const UserOnly = ({ children }: { children: ReactNode }) => {
  const { user, authChecked } = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (authChecked && !user) {
      router.replace("/login");
    }
  }, [authChecked, user]);

  if (!authChecked) {
    return <Text>Loading...</Text>;
  }

  if (!user) return null;

  return <>{children}</>;
};

export default UserOnly;
