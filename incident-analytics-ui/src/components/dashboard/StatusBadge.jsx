const statusStyles = {
  OPEN: "bg-blue-50 text-blue-700 border-blue-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  RESOLVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CLOSED: "bg-slate-100 text-slate-700 border-slate-200",
};

const StatusBadge = ({ status }) => {
  if (!status) {
    return (
      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
        —
      </span>
    );
  }

  const normalizedStatus = String(status).toUpperCase();

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        statusStyles[normalizedStatus] ||
        "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {normalizedStatus}
    </span>
  );
};

export default StatusBadge;