import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export function StatusChart({ data }) {
  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="rounded-lg border bg-white p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Status Overview
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
