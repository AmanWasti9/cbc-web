import { useState } from "react";
import {
  Eye,
  EyeOff,
  Truck,
  Camera,
  Thermometer,
  Bike,
  Battery,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Truck,
    title: "Fleet Management",
    color: "bg-green-500",
    link: "https://www.youtube.com/watch?v=E9c6YE2JB5g",
  },
  {
    icon: Thermometer,
    title: "Cold Chain Monitoring",
    color: "bg-lime-500",
    link: "https://www.youtube.com/watch?v=0zKQKe79ziE",
  },
  {
    icon: Camera,
    title: "Advanced Camera Tracking",
    color: "bg-green-600",
    link: "https://www.youtube.com/watch?v=gcWFGSk2r_w",
  },
  {
    icon: Battery,
    title: "Genset Monitoring",
    color: "bg-lime-600",
    link: "https://www.youtube.com/watch?v=S1mj3SkQTsU",
  },
  {
    icon: MapPin,
    title: "Deep Freezer Monitoring",
    color: "bg-green-700",
    link: "https://www.youtube.com/watch?v=KkS_NOtrH1U",
  },
  {
    icon: Bike,
    title: "Moto Track",
    color: "bg-lime-700",
    link: "https://www.youtube.com/watch?v=Tjhd7lx-rbU",
  },
];
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Error state to store error messages
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset the error message before checking the credentials
    setError("");

    // Check if email and password match the required credentials
    if (username === "CBC" && password === "CBC123") {
      // Redirect to dashboard on successful login
      navigate("/dashboard"); // Navigate only if credentials are correct
    } else {
      // Set the error message if credentials are incorrect
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Login Form Section */}
      <div className="w-full lg:w-[40%] xl:w-[35%] bg-white flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-lime-50 opacity-50" />
        <div className="relative z-10 w-full max-w-md space-y-8">
          <div className="text-center">
            <img
              src="Images/cbc.png"
              alt="Logo"
              className="h-12 w-auto mx-auto mb-8"
            />
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
              Welcome back
            </h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors bg-white/50 backdrop-blur-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Display error message if credentials are incorrect */}
            {error && (
              <div className="text-red-600 text-sm mt-2 text-center">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 rounded-xl bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600 text-white font-medium shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/35 transition-all duration-200"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* Feature Showcase Section */}
      <div className="hidden lg:block relative flex-1 overflow-hidden bg-gradient-to-br from-green-900 to-green-800">
        <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6DTP1RR66WOrTpUNrvpynXj67Uv2WX.png')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 to-green-800/90 backdrop-blur-sm" />
        <div className="relative h-full flex flex-col justify-center p-8 xl:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Complete Vehicle Tracking Solution
            </h2>
            <p className="text-green-100">
              Monitor and manage your entire fleet with our comprehensive
              tracking system
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* {features.map((feature, index) => (
              <div
                key={index}
                className="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm"
              >
                <div
                  className={`${feature.color} text-white p-3 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon size={24} />
                </div>
                <h3 className="text-white font-medium">{feature.title}</h3>
              </div>
            ))} */}
            {features.map((feature, index) => (
              <a
                key={index}
                href={feature.link} // Use the link property
                className="group p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer backdrop-blur-sm"
              >
                <div
                  className={`${feature.color} text-white p-3 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon size={24} />
                </div>
                <h3 className="text-white font-medium">{feature.title}</h3>
              </a>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />
        </div>
      </div>
    </div>
  );
}
