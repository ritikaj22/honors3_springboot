import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import UserOnly from "../components/UserOnly";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setUser } from "../store/authSlice";
import ThemeToggle from "../components/ThemeToggle";
import { logoutUser } from "../store/authSlice";
import { router } from "expo-router";

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const mode = useAppSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber || "");
  const [department, setDepartment] = useState(user?.department || "");

  const handleUpdate = async () => {
    try {
      const resp = await axios.put(
        `http://localhost:9099/users/${user.id}`,
        {
          id: user.id,
          name,
          email,
          mobileNumber,
          department,
        }
      );
      dispatch(setUser(resp.data));
      Alert.alert("Updated", "Profile updated successfully");
    } catch (err: any) {
      Alert.alert(
        "Update failed",
        err?.response?.data?.message || err.message || "Error"
      );
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    router.replace("/login");
  };

  return (
    <UserOnly>
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#111" : "#f5f5f5" },
        ]}
      >
        <Text style={styles.title}>Profile</Text>

        <ThemeToggle />

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

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
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Department"
          value={department}
          onChangeText={setDepartment}
        />

        <Button title="Save" onPress={handleUpdate} />

        <View style={{ marginTop: 16 }}>
          <Button title="Logout" color="red" onPress={handleLogout} />
        </View>
      </View>
    </UserOnly>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
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
