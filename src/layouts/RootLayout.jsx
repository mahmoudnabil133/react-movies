import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

export default function RootLayout() {
  return (
    <div className="dark min-h-screen bg-[#0b1220]">
      <Navbar />
      <main className="pt-[72px]">
        <Outlet />
      </main>
    </div>
  );
}
