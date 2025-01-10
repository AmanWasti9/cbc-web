import { useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { MetricCard } from "../components/dashboard/MetricCard";
import { VehicleList } from "../components/dashboard/VehicleList";
import {
  VehicleActivityChart,
  PhaseCompletionChart,
} from "../components/dashboard/Charts";
import { TabView } from "../components/dashboard/TabView";
import Map from "./Map";
import { allVehicles } from "../data/vehiclesData"; 

const activityData = [
  { name: "Mon", active: 65, inactive: 35 },
  { name: "Tue", active: 75, inactive: 25 },
  { name: "Wed", active: 85, inactive: 15 },
  { name: "Thu", active: 70, inactive: 30 },
  { name: "Fri", active: 90, inactive: 10 },
  { name: "Sat", active: 80, inactive: 20 },
  { name: "Sun", active: 95, inactive: 5 },
];

const phaseData = [
  { name: "Phase 1", completed: 85, pending: 15 },
  { name: "Phase 2", completed: 65, pending: 35 },
  { name: "Phase 3", completed: 75, pending: 25 },
  { name: "Phase 4", completed: 90, pending: 10 },
  { name: "Phase 5", completed: 70, pending: 30 },
];

export default function Dashboard() {
  const [selectedVehicleType, setSelectedVehicleType] = useState("active");

  const waterBowzers = allVehicles.filter((v) => v.type === "water_bowzer");
  const sanitationVehicles = allVehicles.filter((v) => v.type === "sanitation");
  const activeVehicles = allVehicles.filter((v) => v.status === "active");

  const handleMetricCardClick = (type) => {
    setSelectedVehicleType(type);
  };

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        {/* Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Water Bowzer"
            value={waterBowzers.length}
            total={allVehicles.length}
            trend={5.2}
            onClick={() => handleMetricCardClick("water_bowzer")}
          />
          <MetricCard
            title="Sanitation"
            value={sanitationVehicles.length}
            total={allVehicles.length}
            trend={-2.1}
            onClick={() => handleMetricCardClick("sanitation")}
          />
          <MetricCard
            title="Active Vehicles"
            value={activeVehicles.length}
            total={allVehicles.length}
            trend={8.5}
            onClick={() => handleMetricCardClick("active")}
          />
          <MetricCard
            title="Completed Routes"
            value={156}
            total={200}
            trend={12.3}
          />
        </div>
        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <VehicleActivityChart data={activityData} />
          <PhaseCompletionChart data={phaseData} />
        </div>

        {/* Vehicle List */}
        <div className="grid gap-6 grid-cols-1">
          {selectedVehicleType && (
            <VehicleList
              vehicles={
                {
                  water_bowzer: waterBowzers,
                  sanitation: sanitationVehicles,
                  active: activeVehicles,
                }[selectedVehicleType] || activeVehicles
              }
              title={
                {
                  water_bowzer: "Water Bowzer Vehicles",
                  sanitation: "Sanitation Vehicles",
                  active: "Active Vehicles",
                }[selectedVehicleType] || "Active Vehicles"
              }
            />
          )}
        </div>
        {/* TabView */}
        <div className="grid gap-6 grid-cols-1">
          <TabView />
        </div>

        {/* Map view */}
        <div className="grid gap-6 grid-cols-1">
          <Map />
        </div>
      </div>
    </DashboardLayout>
  );
}
