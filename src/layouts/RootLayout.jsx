import { Outlet, NavLink } from "react-router";
import Navbar from "../components/Navbar/Navbar";

export default function RootLayout() {
  return (
    <div>
      <nav>
        <Navbar/>
      </nav>

      <main>
        <Outlet /> {/* child pages render here */}
      </main>

      {/* <footer>My App © 2025</footer> */}
    </div>
  );
}