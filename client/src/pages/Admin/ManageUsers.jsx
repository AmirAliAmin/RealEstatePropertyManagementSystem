import React, { useEffect, useState } from "react";
import { fetchUsers, updateUserRole, deleteUser } from "../../api/users";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle update role
  const handleUpdate = async (userId) => {
    try {
      if (!newRole) return alert("Please select a role");
      await updateUserRole(userId, newRole);
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  // Handle delete
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Users</h1>
      <table className="min-w-full border bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="p-2 border">{user.fullName}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  {editingUser === user._id ? (
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="border rounded p-1"
                    >
                      <option value="">Select Role</option>
                      <option value="user">USER</option>
                      <option value="salesman">SALESMAN</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="p-2 border flex gap-2">
                  {editingUser === user._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingUser(user._id);
                        setNewRole(user.role);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 border text-center" colSpan="4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
