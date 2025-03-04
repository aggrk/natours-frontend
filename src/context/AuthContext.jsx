import { createContext, useEffect, useState } from "react";
import { fetchUser } from "../utils/apiTours";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cache the authentication state to avoid redundant API calls
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  async function checkAuth() {
    try {
      const user = await fetchUser();

      if (user?.status === "fail") {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    } catch (err) {
      console.log(err);
      setIsAuth(false);
    } finally {
      setIsLoading(false);
      setIsAuthChecked(true); // Mark authentication check as complete
    }
  }

  useEffect(() => {
    // Only run the check if authentication hasn't been checked yet
    if (!isAuthChecked) {
      checkAuth();
    }
  }, [isAuthChecked]); // Dependency on isAuthChecked instead of isAuth

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, isLoading, setIsLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
