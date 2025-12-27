import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "./context/BookContext";
import { UserProvider } from "./context/UserContext";
import Pages from "./Pages";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>

        <BookProvider>
          <AuthProvider>
            <UserProvider>
              <Pages />
            </UserProvider>
          </AuthProvider>
        </BookProvider>
    </BrowserRouter>
  </StrictMode>
);
