import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ GET all users
export const fetchUsers = async () => {
  const res = await axios.get(API_URL, getAuthHeaders());
  return res.data;
};

// ✅ UPDATE user role
export const updateUserRole = async (userId, role) => {
  const res = await axios.put(`${API_URL}/${userId}`, { role }, getAuthHeaders());
  return res.data;
};

// ✅ DELETE user
export const deleteUser = async (userId) => {
  const res = await axios.delete(`${API_URL}/${userId}`, getAuthHeaders());
  return res.data;
};
