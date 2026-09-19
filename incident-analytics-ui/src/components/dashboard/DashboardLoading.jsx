import React from "react";

const DashboardLoading = () => {
  return (
    <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-700" />

        <p className="mt-3 text-sm text-gray-500">
          Loading incident data...
        </p>
      </div>
    </div>
  );
};

export default DashboardLoading;