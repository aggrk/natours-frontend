import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Tours from "./pages/Tours/Tours";
import Signin from "./pages/Users/Signin";
import Signup from "./pages/Users/Signup";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import ProtectedRoutes from "./pages/Users/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Tours />} />
        </Route>
        <Route
          path="signin"
          element={<Signin setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 10000, style: { width: "400px" } }}
      />
    </BrowserRouter>
  );
}
