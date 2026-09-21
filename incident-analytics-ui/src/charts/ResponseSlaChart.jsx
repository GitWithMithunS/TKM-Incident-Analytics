import React, { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ResponseSlaChart = ({ incidents = [] }) => {
  const data = useMemo(() => {
    const applicable = incidents.filter(
      (incident) =>
        incident.responseSlaMet !== null &&
        incident.responseSlaMet !== undefined,
    );

    const met = applicable.filter(
      (incident) => incident.responseSlaMet === true,
    ).length;

    const failed = applicable.filter(
      (incident) => incident.responseSlaMet === false,
    ).length;

    const total = met + failed;

    return [
      {
        name: "SLA Met",
        value: met,
        percentage: total > 0 ? Math.round((met / total) * 100) : 0,
      },
      {
        name: "SLA Failed",
        value: failed,
        percentage: total > 0 ? Math.round((failed / total) * 100) : 0,
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
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-sm text-gray-500">
            No response SLA data available.
          </p>
        </div>
      ) : (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="48%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                label={({ percentage }) => `${percentage}%`}
                labelLine={false}
              >
                <Cell fill="#16a34a" />
                <Cell fill="#dc2626" />
              </Pie>

              <Tooltip
                formatter={(value, name, item) => [
                  `${item.payload.percentage}% (${value} incidents)`,
                  name,
                ]}
              />

              <text
                x="50%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-900 text-lg font-semibold"
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