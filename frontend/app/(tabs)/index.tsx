
import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  Button,
  FlatList,
  View, 
  StyleSheet,
} from "react-native";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/src/api/usersApi";
import { User } from "@/constants/types/user.types";

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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

  const handleEdit = (user: User) => {
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
    <View style={{ flex: 1, padding: 40}}>
      
          <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center"}}>CRUD Usuarios</Text>

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
      
    </View>
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
