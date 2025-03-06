import { useContext } from "react";
import { logoutUser } from "./apiTours";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogout() {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await logoutUser();
      if (res.status === "success") {
        setIsAuth(false);
        navigate("/signin");
        // setIsSidebarOpen(false);
      }
      return res;
    } catch (err) {
      console.log(err);
      toast.error("Failed to logout");
    }
  }

  return handleLogout;
}
