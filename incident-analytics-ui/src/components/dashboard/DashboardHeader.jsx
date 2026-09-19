import React from "react";

const DashboardHeader = ({ selectedUpload, uploads }) => {
  const selectedUploadData = uploads?.find(
    (upload) => String(upload.id) === String(selectedUpload)
  );

  return (
    <div className="mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Incident Analytics
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor incident volume, SLA performance, priorities and resolution
          trends.
        </p>
      </div>

      {selectedUploadData && (
        <div className="mt-3 inline-flex items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
          <span className="font-medium text-gray-800">
            Dataset:
          </span>

          <span className="ml-1">
            {selectedUploadData.fileName}
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;