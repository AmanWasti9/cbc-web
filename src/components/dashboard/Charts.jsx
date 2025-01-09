import {
  Line,
  Bar,
  BarChart,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function VehicleActivityChart({ data }) {
  return (
    <div className="rounded-2xl border border-green-100 bg-white/80 backdrop-blur-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Vehicle Activity
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#374151" />
            <YAxis stroke="#374151" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="active"
              name="Active"
              stroke="#16A34A"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="inactive"
              name="Inactive"
              stroke="#EAB308"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function PhaseCompletionChart({ data }) {
  return (
    <div className="rounded-2xl border border-green-100 bg-white/80 backdrop-blur-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Phase Completion
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#374151" />
            <YAxis stroke="#374151" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Bar
              dataKey="completed"
              name="Completed"
              fill="#16A34A"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="pending"
              name="Pending"
              fill="#EAB308"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
