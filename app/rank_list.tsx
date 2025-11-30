import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import api from "../api/axios";
import UserOnly from "../components/UserOnly";
import { useAppSelector } from "../hooks/reduxHooks";

interface Student {
  id: string;
  name: string;
  points: number;
  department?: string;
}

const RankListScreen = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [deltaPoints, setDeltaPoints] = useState<string>("");

  const user = useAppSelector((s) => s.auth.user);

const loadRankList = async () => {
  const resp = await api.get<Student[]>("/students/rank-list");
  setStudents(resp.data);
};

  useEffect(() => {
    loadRankList();
  }, []);

  const canAddPoints =
    user?.type && user.type.toUpperCase() === "TEACHER";

  const handleAddPoints = async () => {
    if (!selectedStudentId) return Alert.alert("Select a student");
    const delta = Number(deltaPoints);
    if (Number.isNaN(delta)) return Alert.alert("Enter numeric points");

    try {
      await api.post(
  `/students/${selectedStudentId}/points`,
  null,
  {
    params: { delta }
  }
);
    } catch (err: any) {
      Alert.alert(
        "Error",
        err?.response?.data?.message || err.message || "Error"
      );
    }
  };

  return (
    <UserOnly>
      <View style={styles.container}>
        <Text style={styles.title}>Rank List</Text>

        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.item,
                selectedStudentId === item.id && styles.itemSelected,
              ]}
            >
              <Text
                style={{ fontWeight: "bold" }}
                onPress={() => setSelectedStudentId(item.id)}
              >
                #{index + 1} {item.name}
              </Text>
              <Text>Points: {item.points ?? 0}</Text>
              {item.department && <Text>{item.department}</Text>}
            </View>
          )}
        />

        {canAddPoints && (
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontWeight: "600" }}>Add points (Teacher)</Text>
            <TextInput
              style={styles.input}
              placeholder="Points to add"
              keyboardType="numeric"
              value={deltaPoints}
              onChangeText={setDeltaPoints}
            />
            <Button title="Add Points" onPress={handleAddPoints} />
          </View>
        )}
      </View>
    </UserOnly>
  );
};

export default RankListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  item: {
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 4,
    backgroundColor: "#fff",
  },
  itemSelected: {
    borderColor: "blue",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
