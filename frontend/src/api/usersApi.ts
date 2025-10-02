import axios from "axios";

const API_URL = "http://localhost:3000/users";

// export const getUsers = () => axios.get(API_URL);
// export const createUser = (user: {
//   name: string;
//   email: string;
//   password: string;
// }) => axios.post(API_URL, user);
// export const updateUser = (
//   id: string,
//   user: { name: string; email: string; password: string }
// ) => axios.put(`${API_URL}/${id}`, user);
// export const deleteUser = (id: string) => axios.delete(`${API_URL}/${id}`);

let mockUsers = [
  { id: "1", name: "Juan Pérez", email: "juan@example.com", password: "1234" },
  { id: "2", name: "María López", email: "maria@example.com", password: "abcd" },
];

export const getUsers = async () => {
  return new Promise<{ data: typeof mockUsers }>((resolve) =>
    setTimeout(() => resolve({ data: mockUsers }), 500)
  );
};

export const createUser = async (user: { name: string; email: string; password: string }) => {
  const newUser = { ...user, id: Date.now().toString() };
  mockUsers.push(newUser);
  return new Promise((resolve) => setTimeout(() => resolve(newUser), 500));
};

export const updateUser = async (id: string, user: { name: string; email: string; password: string }) => {
  mockUsers = mockUsers.map((u) => (u.id === id ? { ...u, ...user } : u));
  return new Promise((resolve) => setTimeout(() => resolve(true), 500));
};

export const deleteUser = async (id: string) => {
  mockUsers = mockUsers.filter((u) => u.id !== id);
  return new Promise((resolve) => setTimeout(() => resolve(true), 500));
};