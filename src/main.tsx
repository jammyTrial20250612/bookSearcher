import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import Pages from "./Pages";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Pages />
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
