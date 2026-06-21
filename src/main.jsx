import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App";
import { I18nProvider } from "./context/I18nContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="movie-theme">
        <App />
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>
);
