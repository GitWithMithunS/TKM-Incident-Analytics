import React from "react";

const DashboardEmpty = () => {
  return (
    <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-900">
          No incidents found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Try changing or clearing your filters.
        </p>
      </div>
    </div>
  );
};

export default DashboardEmpty;