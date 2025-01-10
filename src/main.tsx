import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./pages/AuthClient/UserContext.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="134168841887-75v5o4vjgvnk99vcq39t20bi6r01uje5.apps.googleusercontent.com">
    <StrictMode>
      <Provider store={store}>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </Provider>
    </StrictMode>
  </GoogleOAuthProvider>
);
