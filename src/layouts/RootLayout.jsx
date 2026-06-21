import { Toaster } from "sonner";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import TrailerModal from "../components/shared/TrailerModal";
import { useTrailer } from "../hooks/useStores";

export default function RootLayout() {
  const { videoKey, isOpen, closeTrailer } = useTrailer();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-[72px]">
        <Outlet />
      </main>
      <Toaster position="top-center" closeButton duration={3000} className="sm:!top-4" />
      {isOpen && <TrailerModal videoKey={videoKey} onClose={closeTrailer} />}
    </div>
  );
}
