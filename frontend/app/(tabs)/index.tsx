import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  FlatList,
  View,
} from "react-native";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/src/api/usersApi";

export default function HomeScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Cargar usuarios al inicio
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateUser(editingId, { name, email, password });
      setEditingId(null);
    } else {
      await createUser({ name, email, password });
    }
    setName("");
    setEmail("");
    setPassword("");
    fetchUsers();
  };

  const handleEdit = (user: any) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>CRUD Usuarios</Text>

      {/* Formulario */}
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginVertical: 5, padding: 8 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginVertical: 5, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginVertical: 5, padding: 8 }}
      />
      <Button
        title={editingId ? "Actualizar Usuario" : "Crear Usuario"}
        onPress={handleSubmit}
      />

      {/* Lista de usuarios */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text>
              {item.name} - {item.email}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Button title="Editar" onPress={() => handleEdit(item)} />
              <Button
                title="Eliminar"
                onPress={() => handleDelete(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
