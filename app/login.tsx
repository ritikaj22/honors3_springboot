import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { loginUser } from "../store/authSlice";
import GuestOnly from "../components/GuestOnly";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      if (user.type?.toUpperCase() === "ADMIN") {
        router.replace("/admin_profile");
      } else {
        router.replace("/profile");
      }
    }
  }, [user]);

  const handleLogin = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email");
      return;
    }
    if (!password) {
      Alert.alert("Password required");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err: any) {
      Alert.alert(
        "Login failed",
        err?.response?.data?.message || err.message || "Error"
      );
    }
  };

  return (
    <GuestOnly>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} />

        <View style={{ marginTop: 16 }}>
          <Text>
            Don't have an account?{" "}
            <Text style={{ color: "blue" }} onPress={() => router.push("/register")}>
              Register
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </GuestOnly>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
