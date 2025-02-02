import Dashboard from "./pages/Dashboard";
import "../src/styles/globals.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleDataManagement from "./pages/VehicleDataManagement";
import LoginPage from "./pages/LoginPage";
import MapWithPolygon from "./pages/MapWithPolygon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/v-m" element={<VehicleDataManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/maps-1" element={<MapWithPolygon />} />
      </Routes>
    </BrowserRouter>
  );
}
