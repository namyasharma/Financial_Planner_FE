import { Routes, Route } from "react-router-dom";
import  Dashboard  from "./pages/Dashboard";
import Login from "./pages/Login.tsx";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    
  );
}

export default App;
