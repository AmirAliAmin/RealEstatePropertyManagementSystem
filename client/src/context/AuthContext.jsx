import { createContext,useContext, useState, useEffect } from "react";
import { registerUser, loginUser, adminLogin } from "../api/authApi";
import api from "../api/axios";


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


export const useAuth = () => {
  return useContext(AuthContext);
};

// import { createContext,useContext, useState, useEffect } from "react";
// import { registerUser, loginUser, adminLogin } from "../api/authApi";
// import api from "../api/axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [loading, setLoading] = useState(true);

//   // on mount: if token exists but user missing, fetch me
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     const bootstrap = async () => {
//       try {
//         if (storedToken) {
//           setToken(storedToken);
//           if (storedUser) {
//             setUser(JSON.parse(storedUser));
//           } else {
//             // fetch profile if not in localStorage
//             const { data } = await api.get("/auth/me");
//             setUser(data);
//             localStorage.setItem("user", JSON.stringify(data));
//           }
//         }
//       } catch (e) {
//         // token invalid/expired
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);
//         setToken(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     bootstrap();
//   }, []);

//   const handleLogin = async (credentials) => {
//     // 1) get token
//     const { token } = await loginUser(credentials);
//     localStorage.setItem("token", token);
//     setToken(token);

//     // 2) fetch profile
//     const { data: me } = await api.get("/auth/me");
//     setUser(me);
//     localStorage.setItem("user", JSON.stringify(me));

//     return { token, user: me };
//   };

//   const handleAdminLogin = async (credentials) => {
//     // backend returns token (+ sometimes user), but we normalize by calling /me
//     const { token } = await adminLogin(credentials);
//     localStorage.setItem("token", token);
//     setToken(token);

//     const { data: me } = await api.get("/auth/me");
//     setUser(me);
//     localStorage.setItem("user", JSON.stringify(me));

//     return { token, user: me };
//   };

//   const handleRegister = async (formData) => {
//     return await registerUser(formData);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         loading,
//         handleLogin,
//         handleAdminLogin,
//         handleRegister,
//         handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

