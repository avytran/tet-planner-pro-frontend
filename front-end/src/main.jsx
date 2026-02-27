import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./apollo/client.js";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./app/store";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <AuthProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </AuthProvider>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </StrictMode>,
);
