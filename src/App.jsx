import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Tours from "./pages/Tours/Tours";
import Signin from "./pages/Users/Signin";
import Signup from "./pages/Users/Signup";

export default function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Tours />} />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
