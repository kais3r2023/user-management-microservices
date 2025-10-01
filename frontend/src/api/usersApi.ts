import axios from "axios";

const API_URL = "http://localhost:3000/users";

export const getUsers = () => axios.get(API_URL);
export const createUser = (user: {
  name: string;
  email: string;
  password: string;
}) => axios.post(API_URL, user);
export const updateUser = (
  id: string,
  user: { name: string; email: string; password: string }
) => axios.put(`${API_URL}/${id}`, user);
export const deleteUser = (id: string) => axios.delete(`${API_URL}/${id}`);
