import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  userId: null,
  userRole: null,
  token: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("USER_ID"));
  const [userRole, setUserRole] = useState(localStorage.getItem("USER_ROLE"));
  const [token, setToken] = useState(localStorage.getItem("JWT_TOKEN"));

  const handleLogin = (token) => {
    const decodedUser = jwtDecode(token);
    setUserId(decodedUser.sub);
    setUserRole(decodedUser.roles);
    setToken(token);
    localStorage.setItem("USER_ID", decodedUser.sub);
    localStorage.setItem("USER_ROLE", decodedUser.roles);
    localStorage.setItem("JWT_TOKEN", token);
  };

  const handleLogout = () => {
    setUserId(null);
    setUserRole(null);
    setToken(null);
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USER_ROLE");
    localStorage.removeItem("JWT_TOKEN");
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        userRole,
        token,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
