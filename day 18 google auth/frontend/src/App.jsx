import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/login";
import LoginSuccess from "./component/LoginSuccess";
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
