import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { WishlistProvider } from "./context/WishlistContext";
import { I18nProvider } from "./context/I18nContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </I18nProvider>
  </StrictMode>
);
