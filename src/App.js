import Dashboard from "./pages/Dashboard";
import "../src/styles/globals.css";
import Map from "./pages/Map";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}
