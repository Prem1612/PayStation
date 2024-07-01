
import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Signup } from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin.jsx";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to signin if no token */}
        {!token && <Route path="/" element={<Navigate to="/signin" replace />} />}
        {/* Redirect to dashboard if token exists */}
        {token && <Route path="/" element={<Navigate to="/dashboard" replace />} />}
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;























