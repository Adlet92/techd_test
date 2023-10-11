import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { UserProvider } from "./components/context/UserContext";


ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
        <App />
    </UserProvider>
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>
);
