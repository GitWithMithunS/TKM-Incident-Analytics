import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ResolutionSlaChart = ({ incidents = [] }) => {
  const data = useMemo(() => {
    const metWithoutPending = incidents.filter(
      (incident) => incident.resolutionSlaMetWithoutPending === true,
    ).length;

    const failedWithoutPending = incidents.filter(
      (incident) => incident.resolutionSlaMetWithoutPending === false,
    ).length;

    const metWithPending = incidents.filter(
      (incident) => incident.resolutionSlaMetWithPending === true,
    ).length;

    const failedWithPending = incidents.filter(
      (incident) => incident.resolutionSlaMetWithPending === false,
    ).length;

    const calculatePercentage = (met, failed) => {
      const total = met + failed;

      return {
        total,
        metPercentage: total > 0 ? Math.round((met / total) * 100) : 0,
        failedPercentage: total > 0 ? Math.round((failed / total) * 100) : 0,
      };
    };

    const withoutPendingStats = calculatePercentage(
      metWithoutPending,
      failedWithoutPending,
    );

    const withPendingStats = calculatePercentage(
      metWithPending,
      failedWithPending,
    );

    return {
      withoutPending: [
        {
          name: "SLA Met",
          value: metWithoutPending,
          percentage: withoutPendingStats.metPercentage,
        },
        {
          name: "SLA Failed",
          value: failedWithoutPending,
          percentage: withoutPendingStats.failedPercentage,
        },
      ],
      withPending: [
        {
          name: "SLA Met",
          value: metWithPending,
          percentage: withPendingStats.metPercentage,
        },
        {
          name: "SLA Failed",
          value: failedWithPending,
          percentage: withPendingStats.failedPercentage,
        },
      ],
      withoutPendingTotal: withoutPendingStats.total,
      withPendingTotal: withPendingStats.total,
    };
  }, [incidents]);

  const renderPie = (pieData, total) => {
    if (total === 0) {
      return (
        <div className="flex h-[220px] items-center justify-center">
          <p className="text-sm text-gray-400">No data</p>
        </div>
      );
    }

    return (
      <div className="h-[280px] mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="43%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              label={({ percentage }) => `${percentage}%`}
              labelLine = {{ stroke: "#9ca3af", strokeWidth: 1 }}
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

            <Legend verticalAlign="bottom" />

            <text
              x="50%"
              y="41%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-900 text-xl font-bold"
            >
              {total}
            </text>

            <text
              x="50%"
              y="51%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-gray-500 text-xs"
            >
              Incidents
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Resolution SLA Performance
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Resolution SLA performance under both calculation methods.
        </p>
      </div>

      <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="pr-0 md:pr-5">
          <h3 className="text-sm font-medium text-gray-700 ">Without Pending</h3>

          {renderPie(data.withoutPending, data.withoutPendingTotal)}
        </div>

        <div className="pt-5 bg- md:pl-5 md:pt-0">
          <h3 className="text-sm font-medium text-gray-700">With Pending</h3>

          {renderPie(data.withPending, data.withPendingTotal)}
        </div>
      </div>
    </div>
  );
};

export default ResolutionSlaChart;
