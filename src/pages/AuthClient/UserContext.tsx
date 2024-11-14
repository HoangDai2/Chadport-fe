import React, { createContext, useContext, useEffect, useState } from "react";
import TUser from "../../Types/TUsers";
import apisphp from "../../Service/api";

type UserContextType = {
  user: Partial<TUser> | null;
  token: string | null;
  setUser: (user: Partial<TUser> | null) => void;
  setToken: (token: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Partial<TUser> | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwt_token")
  );

  // Cập nhật `localStorage` khi `token` thay đổi
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt_token", token);
    } else {
      localStorage.removeItem("jwt_token");
    }
  }, [token]);

  // Lấy dữ liệu người dùng khi có token
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await apisphp.get("/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data?.data) {
            setUser(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      }
    };
    fetchUserData();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
