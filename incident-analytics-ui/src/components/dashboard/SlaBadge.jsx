const SlaBadge = ({ value, label }) => {
  if (value === null || value === undefined) {
    return (
      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
        —
      </span>
    );
  }

  const met = Boolean(value);

  return (
    <span
      title={label}
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        met
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {met ? "Met" : "Failed"}
    </span>
  );
};

export default SlaBadge;