import { Toaster } from "sonner";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { WishlistProvider } from "../context/WishlistContext";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AuthProvider>
        <WishlistProvider>
          <Navbar />
          <main className="pt-[72px]">
            <Outlet />
          </main>
          <Toaster position="top-right" closeButton duration={3000} />
        </WishlistProvider>
      </AuthProvider>
    </div>
  );
}
