import React from "react";
import ReactDOM from "react-dom/client";
import Test from "./Pages/Course-Test/Test.js";
import "bootstrap/dist/css/bootstrap.css";
import LoginPage from "./Pages/Login Page/loginPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Test />
    <LoginPage/>
  </React.StrictMode>
);
