import { useState } from "react";
import { VehicleTable } from "./VehicleTable";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { allVehicles } from "../../data/vehiclesData";
import { fenceCoverageData } from "../../data/fenceCoverageData";
import { vehicleLogsData } from "../../data/vehicleLogsData";
import { FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";

export function TabView() {
  const [activeTab, setActiveTab] = useState("vehicles");

  // Function to export the current tab data to Excel
  const exportToExcel = () => {
    let data = [];
    if (activeTab === "vehicles") {
      data = allVehicles;
    } else if (activeTab === "fenceCoverage") {
      data = fenceCoverageData;
    } else if (activeTab === "vehicleLogs") {
      data = vehicleLogsData;
    }

    // Convert JSON data to worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${activeTab} Data`);

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `${activeTab}_data.xlsx`);
  };

  return (
    <div className="rounded-2xl border border-green-100 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="flex border-b border-green-100">
          <TabButton
            active={activeTab === "vehicles"}
            onClick={() => setActiveTab("vehicles")}
          >
            Vehicles
          </TabButton>
          <TabButton
            active={activeTab === "fenceCoverage"}
            onClick={() => setActiveTab("fenceCoverage")}
          >
            Fence Coverage
          </TabButton>
          <TabButton
            active={activeTab === "vehicleLogs"}
            onClick={() => setActiveTab("vehicleLogs")}
          >
            Vehicle Logs
          </TabButton>
        </div>
        <div>
          {/* <button onClick={exportToExcel}>Export to Excel</button> */}
          <img
            src="/Images/excel.png"
            onClick={exportToExcel}
            style={{
              width: "80%",
              height: "80%",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div>
        {activeTab === "vehicles" && <VehicleTable data={allVehicles} />}
        {activeTab === "fenceCoverage" && (
          <FenceCoverageTable data={fenceCoverageData} />
        )}
        {activeTab === "vehicleLogs" && (
          <VehicleLogsTable data={vehicleLogsData} />
        )}
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-green-50 text-green-700 border-b-2 border-green-500"
          : "text-gray-600 hover:bg-green-50 hover:text-green-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function FenceCoverageTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="p-4 border-b border-green-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search fence coverage..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          />
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-green-100 bg-green-50/50">
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              S#
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Total Fences
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Fences Covered
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Fences Remaining
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Fences Covered (%)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-100">
          {paginatedData.map((item, index) => (
            <tr key={index} className="hover:bg-green-50/50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {item.id}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.totalFences}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.fencesCovered}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.fencesRemaining}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.fencesCoveredPercentage.toFixed(2)}%
              </td>
            </tr>
          ))}

          {/* Empty rows to maintain table size */}
          {Array.from(
            { length: itemsPerPage - paginatedData.length },
            (_, index) => (
              <tr key={`empty-${index}`}>
                <td className="px-4 py-3">&nbsp;</td>
                <td className="px-4 py-3">&nbsp;</td>
                <td className="px-4 py-3">&nbsp;</td>
                <td className="px-4 py-3">&nbsp;</td>
                <td className="px-4 py-3">&nbsp;</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-green-100 px-4 py-3">
        <span className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>
        <div className="flex gap-1 justify-center items-center">
          <PaginationButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredData.length}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
          <div>
            {/* Push download icon to the right */}
            <FiDownload className="h-[20px] w-[20px] ml-[50px] cursor-pointer text-gray-600 hover:text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function VehicleLogsTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="p-4 border-b border-green-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search vehicle logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          />
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-green-100 bg-green-50/50">
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              S#
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Phase Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Reg#
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Enter Time
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Exit Time
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-green-800">
              Duration
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-100">
          {paginatedData.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-green-50/50 transition-colors"
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {item.id}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{item.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.phaseName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{item.regNo}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.enterTime}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.exitTime}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.duration}
              </td>
            </tr>
          ))}

          {/* Empty rows to maintain table size */}
          {Array.from(
            { length: itemsPerPage - paginatedData.length },
            (_, index) => (
              <tr key={`empty-${index}`}>
                <td className="px-4 py-3">&nbsp;</td>
                <td className="px-4 py-3">&nbsp;</td>
                <td className="px-4 py-3">&nbsp;</td>
                <td className="px-4 py-3">&nbsp;</td>
                <td className="px-4 py-3">&nbsp;</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-green-100 px-4 py-3">
        <span className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>
        <div className="flex gap-1 justify-center items-center">
          <PaginationButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredData.length}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
          <div>
            {/* Push download icon to the right */}
            <FiDownload className="h-[20px] w-[20px] ml-[50px] cursor-pointer text-gray-600 hover:text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PaginationButton({ children, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg border border-green-100 p-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-50 text-green-700"
    >
      {children}
    </button>
  );
}
