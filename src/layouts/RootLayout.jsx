import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { WishlistProvider } from "../context/WishlistContext";

export default function RootLayout() {
  return (
    <div className="dark min-h-screen bg-[#0b1220]">
      <AuthProvider>
        <WishlistProvider>
          <Navbar />
          <main className="pt-[72px]">
            <Outlet />
          </main>
        </WishlistProvider>
      </AuthProvider>
    </div>
  );
}
