import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import AdminUserOnly from "../components/AdminUserOnly";
import { useAppSelector } from "../hooks/reduxHooks";
import ThemeToggle from "../components/ThemeToggle";

interface Course {
  id: string;
  name: string;
  description: string;
  department: string;
}

const AdminProfileScreen = () => {
  const mode = useAppSelector((s) => s.theme.mode);
  const isDark = mode === "dark";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  const loadCourses = async () => {
    const resp = await axios.get<Course[]>("http://localhost:9099/courses");
    setCourses(resp.data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreateCourse = async () => {
    if (!name) return Alert.alert("Name required");
    try {
      await axios.post("http://localhost:9099/courses", {
        name,
        description,
        department,
      });
      setName("");
      setDescription("");
      setDepartment("");
      await loadCourses();
    } catch (err: any) {
      Alert.alert(
        "Error",
        err?.response?.data?.message || err.message || "Error"
      );
    }
  };

  return (
    <AdminUserOnly>
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#111" : "#f5f5f5" },
        ]}
      >
        <Text style={styles.title}>Admin Dashboard</Text>
        <ThemeToggle />

        <Text style={styles.sectionTitle}>Add Course</Text>

        <TextInput
          style={styles.input}
          placeholder="Course Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Department"
          value={department}
          onChangeText={setDepartment}
        />

        <Button title="Create Course" onPress={handleCreateCourse} />

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          Existing Courses
        </Text>

        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.courseItem}>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>{item.department}</Text>
            </View>
          )}
        />
      </View>
    </AdminUserOnly>
  );
};

export default AdminProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginTop: 12 },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  courseItem: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 4,
    backgroundColor: "#fff",
  },
});
