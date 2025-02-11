import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Tours from "./pages/Tours/Tours";
import Signin from "./pages/Users/Signin";
import Signup from "./pages/Users/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./pages/Users/ProtectedRoutes";
import DashTours from "./Dashboard/DashTours";
import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Dashboard/Settings";
import Inbox from "./Dashboard/Inbox";
import Profile from "./Dashboard/Profile";
import Bookings from "./Dashboard/Bookings";
import ResetLink from "./pages/Users/ResetLink";
import UpdatePassword from "./pages/Users/UpdatePassword";
import TourDetails from "./pages/Tours/TourDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Tours />} />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="reset" element={<ResetLink />} />
        <Route path="resetPassword/:token" element={<UpdatePassword />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="tours" element={<DashTours />} />
            <Route path="tours/:id" element={<TourDetails />} />
            <Route path="settings" element={<Settings />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="profile" element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 5000, style: { width: "400px" } }}
      />
    </BrowserRouter>
  );
}
