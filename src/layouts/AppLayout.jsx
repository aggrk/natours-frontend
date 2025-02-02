import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
