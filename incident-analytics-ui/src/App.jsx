import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
        <ToastContainer/>
      <Routes>
        {/* <ToastContainer/> */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;