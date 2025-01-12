import { BellIcon, MenuIcon, UserCircle, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation  } from "react-router-dom";
import { allVehicles } from "../../data/vehiclesData";

export function DashboardLayout({ children }) {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Check screen width to determine initial sidebar state
    return window.innerWidth >= 768; // Sidebar open by default on medium screens and above
  });
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  const location = useLocation();

  // Automatically open the "Admins" dropdown if on a related route
  // Automatically open the "Admins" dropdown if on a related route
  const isAdminRoute = location.pathname === "/v-m";

  // Update dropdown state based on route
  useEffect(() => {
    if (isAdminRoute) {
      setIsAdminDropdownOpen(true);
    }
  }, [location, isAdminRoute]);

  // Handle window resize to toggle sidebar state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set the initial state on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left Section: Sidebar Toggle & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-lg p-2 hover:bg-green-50 text-green-700"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8">
                <img
                  src="/Images/cbc.png"
                  alt="CBC Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <h1 className="hidden text-xl font-semibold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent md:block">
                Cantonment Board Clifton
              </h1>
            </div>
          </div>

          {/* Right Section: Time, Notifications, Profile */}
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full lg:block">
              {new Date().toLocaleString()}
            </span>
            <button className="relative rounded-lg p-2 hover:bg-green-50 text-green-700">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-yellow-400" />
            </button>
            <div className="relative group">
              <button className="h-9 w-9 rounded-full bg-gradient-to-r from-green-600 to-lime-500 flex items-center justify-center text-white">
                <span className="text-sm font-medium">AD</span>
              </button>
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1 w-48 py-2 bg-white rounded-lg shadow-lg border border-green-100 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible">
                
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </a>
                <hr className="my-2 border-green-100" />
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Time Display for Small Screens */}
        <div className="block lg:hidden text-center bg-green-50 py-1">
          <span className="text-sm text-green-700">
            {new Date().toLocaleString()}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 ease-in-out overflow-hidden border-r bg-white/80 backdrop-blur-sm`}
        >
          <nav className="flex flex-col gap-1 p-4">
            <Link
              active
              to="/dashboard"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                location.pathname === "/dashboard"
                  ? "bg-gradient-to-r from-green-600 to-lime-500 text-white font-medium"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              Dashboard
            </Link>

            {/* Admin Dropdown */}
            <button
              onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
              className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                isAdminDropdownOpen
                  ? "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  : "text-gray-600 hover:bg-green-50 hover:text-green-700"
              }`}
            >
              <span>Admins</span>
              <span className="ml-auto">{isAdminDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {isAdminDropdownOpen && (
              <div className="ml-4 flex flex-col gap-1">
                <Link
                  to="/v-m"
                  state={{ data: allVehicles }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    location.pathname === "/v-m"
                      ? "bg-gradient-to-r from-green-600 to-lime-500 text-white font-medium"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  Vehicle Management
                </Link>
              </div>
            )}
            <NavItem>Settings</NavItem>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ children, active }) {
  return (
    <button
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-gradient-to-r from-green-600 to-lime-500 text-white font-medium"
          : "text-gray-600 hover:bg-green-50 hover:text-green-700"
      }`}
    >
      {children}
    </button>
  );
}
