import React from "react";

const DashboardFilters = ({
  filters,
  uploads,
  onChange,
  onApply,
  onReset,
  loading,
}) => {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Filters
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Filter incidents using the available search fields.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          disabled={loading}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {/* Upload */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Upload
          </label>

          <select
            name="uploadId"
            value={filters.uploadId}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All uploads</option>

            {uploads?.map((upload) => (
              <option key={upload.id} value={upload.id}>
                {upload.fileName}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Status
          </label>

          <select
            name="status"
            value={filters.status}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All statuses</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
            <option value="RESOLVED">Resolved</option>
            <option value="PENDING">Pending</option>
            <option value="IN-PROGRESS">IN-PROGRESS</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={onChange}
            placeholder="Search category"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Priority
          </label>

          <select
            name="priority"
            value={filters.priority}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All priorities</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
            <option value="P4">P4</option>
            <option value="P5">P5</option>
          </select>
        </div>

        {/* Impact */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Impact
          </label>

          <select
            name="impact"
            value={filters.impact}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All impacts</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {/* Response SLA */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Response SLA
          </label>

          <select
            name="responseSlaMet"
            value={filters.responseSlaMet}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All</option>
            <option value="true">Met</option>
            <option value="false">Violated</option>
          </select>
        </div>

        {/* Resolution SLA without pending */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Resolution SLA — Without Pending
          </label>

          <select
            name="resolutionSlaMetWithoutPending"
            value={filters.resolutionSlaMetWithoutPending}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All</option>
            <option value="true">Met</option>
            <option value="false">Violated</option>
          </select>
        </div>

        {/* Resolution SLA with pending */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Resolution SLA — With Pending
          </label>

          <select
            name="resolutionSlaMetWithPending"
            value={filters.resolutionSlaMetWithPending}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All</option>
            <option value="true">Met</option>
            <option value="false">Violated</option>
          </select>
        </div>

        {/* Reopen */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Reopened
          </label>

          <select
            name="isReopen"
            value={filters.isReopen}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">All</option>
            <option value="true">Reopened</option>
            <option value="false">Not reopened</option>
          </select>
        </div>

        {/* Assigned To */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Assigned To
          </label>

          <input
            type="text"
            name="assignedTo"
            value={filters.assignedTo}
            onChange={onChange}
            placeholder="Engineer / assignee"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Caller */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Caller Name
          </label>

          <input
            type="text"
            name="callerName"
            value={filters.callerName}
            onChange={onChange}
            placeholder="Search caller"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Logged By */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Logged By
          </label>

          <input
            type="text"
            name="loggedBy"
            value={filters.loggedBy}
            onChange={onChange}
            placeholder="Search logged by"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Assigned Engineer First Responded */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            First Responded By
          </label>

          <input
            type="text"
            name="assignedEngineerFirstResponded"
            value={filters.assignedEngineerFirstResponded}
            onChange={onChange}
            placeholder="Engineer name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Caller Email */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Caller Email
          </label>

          <input
            type="text"
            name="callerEmail"
            value={filters.callerEmail}
            onChange={onChange}
            placeholder="Search email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Response SLA Violation Reason */}
        <div className="md:col-span-2">
          <label className="mb-1.5 block text-xs font-medium text-gray-700">
            Response SLA Violation Reason
          </label>

          <input
            type="text"
            name="responseSlaViolationReason"
            value={filters.responseSlaViolationReason}
            onChange={onChange}
            placeholder="Search violation reason"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onApply}
          disabled={loading}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Applying..." : "Apply Filters"}
        </button>
      </div>
    </div>
  );
};

export default DashboardFilters;