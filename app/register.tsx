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
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import GuestOnly from "../components/GuestOnly";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { registerUser } from "../store/authSlice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((s) => s.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("FEMALE");
  const [type, setType] = useState("STUDENT");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    if (user) {
      if (user.type?.toUpperCase() === "ADMIN") {
        router.replace("/admin_profile");
      } else {
        router.replace("/profile");
      }
    }
  }, [user]);

  const handleRegister = async () => {
    if (!name) return Alert.alert("Name is required");
    if (!emailRegex.test(email)) return Alert.alert("Invalid email");
    if (!mobileRegex.test(mobileNumber))
      return Alert.alert("Invalid mobile (10 digits, start 6-9)");
    if (!password || password.length < 6)
      return Alert.alert("Password must be at least 6 characters");
    if (password !== confirmPassword)
      return Alert.alert("Passwords do not match");
    if (!dateOfBirth) return Alert.alert("DOB required");
    if (!department) return Alert.alert("Department required");

    const payload = {
      name,
      email,
      mobileNumber,
      password,
      dateOfBirth,
      gender,
      type,
      department,
    };

    try {
      await dispatch(registerUser(payload)).unwrap();
    } catch (err: any) {
      Alert.alert(
        "Registration failed",
        err?.response?.data?.message || err.message || "Error"
      );
    }
  };

  return (
    <GuestOnly>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Register</Text>

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
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />

        <Text style={{ marginTop: 8 }}>Gender</Text>
        <Picker selectedValue={gender} onValueChange={(v) => setGender(v)}>
          <Picker.Item label="Female" value="FEMALE" />
          <Picker.Item label="Male" value="MALE" />
          <Picker.Item label="Other" value="OTHER" />
        </Picker>

        <Text style={{ marginTop: 8 }}>Type</Text>
        <Picker selectedValue={type} onValueChange={(v) => setType(v)}>
          <Picker.Item label="Student" value="STUDENT" />
          <Picker.Item label="Teacher" value="TEACHER" />
          <Picker.Item label="Admin" value="ADMIN" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Department"
          value={department}
          onChangeText={setDepartment}
        />

        <Button
          title={loading ? "Registering..." : "Register"}
          onPress={handleRegister}
        />

        <View style={{ marginTop: 16 }}>
          <Text>
            Already have an account?{" "}
            <Text style={{ color: "blue" }} onPress={() => router.push("/login")}>
              Login
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </GuestOnly>
  );
};

export default RegisterScreen;

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
