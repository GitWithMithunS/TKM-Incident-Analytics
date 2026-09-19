import { FiArrowDown, FiArrowUp } from "react-icons/fi";
// import { FiArrowDown, FiArrowUp, FiArrowUpDown } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import SlaBadge from "./SlaBadge";
import Pagination from "./Pagination";

const formatDateTime = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const SortButton = ({ field, label, sortBy, direction, onSort }) => {
  const active = sortBy === field;

  return (
    <button
      type="button"
      onClick={() => onSort(field)}
      className="group inline-flex items-center gap-1.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-900"
    >
      {label}

      {!active && (
        <FiArrowUp className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500" />
        // <FiArrowUpDown className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500" />
      )}

      {active && direction === "asc" && (
        <FiArrowUp className="h-3.5 w-3.5 text-slate-700" />
      )}

      {active && direction === "desc" && (
        <FiArrowDown className="h-3.5 w-3.5 text-slate-700" />
      )}
    </button>
  );
};

const IncidentTable = ({
  incidents = [],
  loading = false,
  page = 0,
  pageSize = 20,
  totalElements = 0,
  totalPages = 0,
  sortBy = "incidentId",
  direction = "asc",
  onPageChange,
  onSort,
  onRowClick,
}) => {
  const handleSort = (field) => {
    if (sortBy === field) {
      onSort(field, direction === "asc" ? "desc" : "asc");
      return;
    }

    onSort(field, "asc");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Incident Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Detailed incident records from the selected dataset.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {Array.from({ length: 10 }).map((_, index) => (
                  <th key={index} className="px-5 py-3">
                    <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-slate-100">
                  {Array.from({ length: 10 }).map((_, columnIndex) => (
                    <td key={columnIndex} className="px-5 py-4">
                      <div className="h-4 w-full max-w-[120px] animate-pulse rounded bg-slate-100" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : incidents.length === 0 ? (
        <div className="flex min-h-[260px] items-center justify-center px-6 text-center">
          <div>
            <p className="font-medium text-slate-700">
              No incidents found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try changing the filters or upload a different dataset.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-[1500px] w-full">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    <SortButton
                      field="incidentId"
                      label="Incident ID"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                    />
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    <SortButton
                      field="logTime"
                      label="Log Time"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                    />
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    <SortButton
                      field="status"
                      label="Status"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                    />
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    <SortButton
                      field="priority"
                      label="Priority"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                    />
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    <SortButton
                      field="category"
                      label="Category"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                    />
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    <SortButton
                      field="callerName"
                      label="Caller"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                    />
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    <SortButton
                      field="assignedTo"
                      label="Assigned To"
                      sortBy={sortBy}
                      direction={direction}
                      onSort={handleSort}
                    />
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    First Responded By
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    Response SLA
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    Resolution SLA
                  </th>

                  <th className="whitespace-nowrap px-5 py-3 text-left">
                    Reopened
                  </th>
                </tr>
              </thead>

              <tbody>
                {incidents.map((incident) => (
                  <tr
                    key={incident.id ?? incident.incidentId}
                    onClick={() => onRowClick?.(incident)}
                    className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-900">
                      #{incident.incidentId ?? "—"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {formatDateTime(incident.logTime)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={incident.status} />
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {incident.priority ?? "—"}
                    </td>

                    <td className="max-w-[180px] truncate px-5 py-4 text-sm text-slate-600">
                      {incident.category || "—"}
                    </td>

                    <td className="max-w-[180px] truncate px-5 py-4 text-sm text-slate-600">
                      {incident.callerName || "—"}
                    </td>

                    <td className="max-w-[180px] truncate px-5 py-4 text-sm text-slate-600">
                      {incident.assignedTo || "—"}
                    </td>

                    <td className="max-w-[180px] truncate px-5 py-4 text-sm text-slate-600">
                      {incident.assignedEngineerFirstResponded || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <SlaBadge
                        value={incident.responseSlaMet}
                        label={incident.responseSlaViolationReason}
                      />
                    </td>

                    <td className="px-5 py-4">
                      <SlaBadge
                        value={incident.resolutionSlaMetWithPending}
                        label="Resolution SLA with pending"
                      />
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
                          incident.isReopen
                            ? "border-orange-200 bg-orange-50 text-orange-700"
                            : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                      >
                        {incident.isReopen ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            totalElements={totalElements}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default IncidentTable;

// import React from "react";

// const formatDateTime = (value) => {
//   if (!value) return "-";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return value;
//   }

//   return date.toLocaleString();
// };

// const StatusBadge = ({ status }) => {
//   const styles = {
//     OPEN: "bg-blue-50 text-blue-700 border-blue-200",
//     CLOSED: "bg-gray-50 text-gray-700 border-gray-200",
//     RESOLVED: "bg-green-50 text-green-700 border-green-200",
//     PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
//   };

//   return (
//     <span
//       className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
//         styles[status] || "bg-gray-50 text-gray-700 border-gray-200"
//       }`}
//     >
//       {status || "-"}
//     </span>
//   );
// };

// const PriorityBadge = ({ priority }) => {
//   return (
//     <span className="text-sm font-semibold text-gray-800">
//       {priority || "-"}
//     </span>
//   );
// };

// const IncidentTable = ({
//   incidents,
//   loading,
//   page,
//   size,
//   totalElements,
//   totalPages,
//   onPageChange,
// }) => {
//   if (loading) {
//     return (
//       <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
//         <div className="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-gray-200 border-t-gray-700" />

//         <p className="mt-3 text-sm text-gray-500">
//           Loading incidents...
//         </p>
//       </div>
//     );
//   }

//   if (!incidents?.length) {
//     return (
//       <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
//         <h3 className="text-sm font-semibold text-gray-900">
//           No incidents found
//         </h3>

//         <p className="mt-1 text-sm text-gray-500">
//           No records match the current filters.
//         </p>
//       </div>
//     );
//   }

//   const startRecord = page * size + 1;
//   const endRecord = Math.min(
//     page * size + incidents.length,
//     totalElements
//   );

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Incident ID
//               </th>

//               <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Logged
//               </th>

//               <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Status
//               </th>

//               <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Priority
//               </th>

//               <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Impact
//               </th>

//               <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Category
//               </th>

//               <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Caller
//               </th>

//               <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Assigned To
//               </th>

//               <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
//                 Response SLA
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-gray-100 bg-white">
//             {incidents.map((incident) => (
//               <tr
//                 key={incident.id ?? incident.incidentId}
//                 className="transition hover:bg-gray-50"
//               >
//                 <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-gray-900">
//                   {incident.incidentId ?? "-"}
//                 </td>

//                 <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
//                   {formatDateTime(incident.logTime)}
//                 </td>

//                 <td className="whitespace-nowrap px-4 py-3">
//                   <StatusBadge status={incident.status} />
//                 </td>

//                 <td className="whitespace-nowrap px-4 py-3">
//                   <PriorityBadge priority={incident.priority} />
//                 </td>

//                 <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
//                   {incident.impact || "-"}
//                 </td>

//                 <td className="max-w-[220px] truncate px-4 py-3 text-sm text-gray-600">
//                   {incident.category || "-"}
//                 </td>

//                 <td className="max-w-[220px] truncate px-4 py-3 text-sm text-gray-600">
//                   {incident.callerName || "-"}
//                 </td>

//                 <td className="max-w-[220px] truncate px-4 py-3 text-sm text-gray-600">
//                   {incident.assignedTo || "-"}
//                 </td>

//                 <td className="whitespace-nowrap px-4 py-3 text-sm">
//                   {incident.responseSlaMet === true && (
//                     <span className="font-medium text-green-700">
//                       Met
//                     </span>
//                   )}

//                   {incident.responseSlaMet === false && (
//                     <span className="font-medium text-red-700">
//                       Violated
//                     </span>
//                   )}

//                   {incident.responseSlaMet == null && (
//                     <span className="text-gray-400">
//                       -
//                     </span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
//         <p className="text-sm text-gray-500">
//           Showing{" "}
//           <span className="font-medium text-gray-700">
//             {startRecord}
//           </span>{" "}
//           to{" "}
//           <span className="font-medium text-gray-700">
//             {endRecord}
//           </span>{" "}
//           of{" "}
//           <span className="font-medium text-gray-700">
//             {totalElements}
//           </span>{" "}
//           incidents
//         </p>

//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             disabled={page === 0}
//             onClick={() => onPageChange(page - 1)}
//             className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             Previous
//           </button>

//           <span className="px-2 text-sm text-gray-600">
//             Page {page + 1} of {Math.max(totalPages, 1)}
//           </span>

//           <button
//             type="button"
//             disabled={page >= totalPages - 1}
//             onClick={() => onPageChange(page + 1)}
//             className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IncidentTable;