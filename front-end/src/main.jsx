import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./apollo/client.js";
import { AuthProvider } from "./context/AuthContext";

document.documentElement.setAttribute("data-theme", "apricot");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
