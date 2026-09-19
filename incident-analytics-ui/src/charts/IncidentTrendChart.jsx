import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const IncidentTrendChart = ({ incidents = [] }) => {
  const data = useMemo(() => {
    const grouped = {};

    incidents.forEach((incident) => {
      if (!incident.logTime) return;

      const date = new Date(incident.logTime);

      if (Number.isNaN(date.getTime())) return;

      const year = date.getFullYear();
      const month = date.getMonth();

      const key = `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}`;

      if (!grouped[key]) {
        grouped[key] = {
          key,
          date: new Date(year, month, 1),
          count: 0,
        };
      }

      grouped[key].count += 1;
    });

    return Object.values(grouped)
      .sort((a, b) => a.date - b.date)
      .map((item) => ({
        month: item.date.toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        }),
        count: item.count,
      }));
  }, [incidents]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Incident Trend
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Number of incidents logged over time.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-sm text-gray-500">
            No incident date data available.
          </p>
        </div>
      ) : (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                dataKey="month"
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

              <Line
                type="monotone"
                dataKey="count"
                name="Incidents"
                stroke="#374151"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default IncidentTrendChart;