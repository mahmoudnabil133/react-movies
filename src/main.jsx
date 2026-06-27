import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App";
import StoreInitializer from "./components/StoreInitializer";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StoreInitializer>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="bookstore-theme">
        <App />
      </ThemeProvider>
    </StoreInitializer>
  </StrictMode>
);
