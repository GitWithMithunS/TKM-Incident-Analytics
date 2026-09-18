import {
  FaClipboardList,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import StatCard from "./StatCard";

function DashboardStats({ incidents = [] }) {
  const total = incidents.length;

  const open = incidents.filter(
    (i) => i.status === "OPEN"
  ).length;

  const closed = incidents.filter(
    (i) => i.status === "CLOSED"
  ).length;

  const sla = incidents.filter(
    (i) =>
      i.responseSla === "BREACHED" ||
      i.resolutionSla === "BREACHED"
  ).length;

  return (
    <div className="grid md:grid-cols-4 gap-5">
{/* 
      <StatCard
        title="Total Incidents"
        value={total}
        icon={<FaClipboardList size={30} />}
        color="text-blue-600"
      />

      <StatCard
        title="Open"
        value={open}
        icon={<FaExclamationTriangle size={30} />}
        color="text-red-600"
      />

      <StatCard
        title="Closed"
        value={closed}
        icon={<FaCheckCircle size={30} />}
        color="text-green-600"
      />

      <StatCard
        title="SLA Violations"
        value={sla}
        icon={<FaClock size={30} />}
        color="text-orange-600" 
      />*/}

    </div>
  );
}

export default DashboardStats;