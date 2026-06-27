import { Toaster } from "sonner";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[72px]">
        <Outlet />
      </main>
      <Toaster position="top-center" closeButton duration={3000} className="sm:!top-4" />
    </div>
  );
}
