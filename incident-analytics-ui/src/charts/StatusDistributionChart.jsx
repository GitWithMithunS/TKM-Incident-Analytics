import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatusDistributionChart = ({ incidents = [] }) => {
  const data = useMemo(() => {
    const statuses = [
      "OPEN",
      "PENDING",
      "RESOLVED",
      "CLOSED",
    ];

    return statuses.map((status) => ({
      status,
      count: incidents.filter(
        (incident) => incident.status === status
      ).length,
    }));
  }, [incidents]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Incident Status
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Distribution of incidents by current status.
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="status"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              formatter={(value) => [
                value,
                "Incidents",
              ]}
            />

            <Bar
              dataKey="count"
              name="Incidents"
              radius={[4, 4, 0, 0]}
              fill="#374151"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatusDistributionChart;