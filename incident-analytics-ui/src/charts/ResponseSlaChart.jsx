import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ResponseSlaChart = ({ incidents = [] }) => {
  const data = useMemo(() => {
    const met = incidents.filter(
      (incident) => incident.responseSlaMet === true
    ).length;

    const failed = incidents.filter(
      (incident) => incident.responseSlaMet === false
    ).length;

    return [
      {
        name: "SLA Met",
        value: met,
      },
      {
        name: "SLA Failed",
        value: failed,
      },
    ];
  }, [incidents]);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Response SLA Performance
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Incidents that met or failed the response SLA.
        </p>
      </div>

      {total === 0 ? (
        <div className="flex h-[280px] items-center justify-center">
          <p className="text-sm text-gray-500">
            No response SLA data available.
          </p>
        </div>
      ) : (
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
              >
                <Cell fill="#16a34a" />
                <Cell fill="#dc2626" />
              </Pie>

              <Tooltip
                formatter={(value) => [
                  value,
                  "Incidents",
                ]}
              />

              <Legend verticalAlign="bottom" />

              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-900 text-2xl font-bold"
              >
                {total}
              </text>

              <text
                x="50%"
                y="56%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-500 text-xs"
              >
                Incidents
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ResponseSlaChart;