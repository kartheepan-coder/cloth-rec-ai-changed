import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Shop } from "./shop";
import Profile from "./components/Profile";
import CheckOut from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Admin from "./pages/Admin";
import { AuthContext } from "./Providers/AuthProviders";
import Preview from "./components/Preview";

const Index = () => {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<App />}></Route>
          <Route path="/category" element={<Shop />}></Route>
          <Route path="/checkout" element={<CheckOut />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/preview" element={<Preview />}></Route>

          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
