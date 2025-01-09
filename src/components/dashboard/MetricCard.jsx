import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState } from "react";

export function MetricCard({
  title,
  value,
  total,
  trend,
  color = "green",
  onClick,
}) {
  const percentage = Math.round((value / total) * 100);
  const isPositive = trend > 0;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`rounded-2xl border border-green-100 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 ${
        isHovered ? "shadow-lg scale-105" : ""
      } cursor-pointer`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
          {Math.abs(trend)}%
        </div>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-gray-600">/ {total}</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="text-green-600 font-medium">{percentage}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-600 to-lime-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
