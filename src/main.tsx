import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TripProvider } from "./components/context/trip-context.tsx";
import { UserProvider } from "./components/context/user-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <TripProvider>
        <App />
      </TripProvider>
    </UserProvider>
  </StrictMode>,
);
