import { createContext, useState, useEffect } from "react";
import { registerUser, loginUser, adminLogin } from "../api/authApi";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedUser) {
      try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);
    } catch (err) {
      console.error("Error parsing stored user:", err);
      localStorage.removeItem("user"); // clean up bad data
    }
  }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    return data;
  };

  const handleAdminLogin = async (credentials) => {
    const data = await adminLogin(credentials);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    return data;
  };

  const handleRegister = async (formData) => {
    const data = await registerUser(formData);
    return data;
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        handleLogin,
        handleAdminLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
