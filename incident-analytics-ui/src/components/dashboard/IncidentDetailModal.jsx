import { FiX } from "react-icons/fi";
import StatusBadge from "./StatusBadge";
import SlaBadge from "./SlaBadge";

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

const DetailItem = ({ label, value, className = "" }) => {
  return (
    <div className={className}>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="break-words text-sm text-slate-700">
        {value === null || value === undefined || value === ""
          ? "—"
          : value}
      </p>
    </div>
  );
};

const Section = ({ title, children }) => {
  return (
    <section className="border-b border-slate-200 px-6 py-5 last:border-b-0">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
        {title}
      </h3>

      {children}
    </section>
  );
};

const IncidentDetailModal = ({ incident, onClose }) => {
  if (!incident) {
    return null;
  }

  const upload = incident.upload;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">
                Incident #{incident.incidentId ?? "—"}
              </h2>

              <StatusBadge status={incident.status} />

              {incident.priority && (
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  {incident.priority}
                </span>
              )}

              {incident.isReopen && (
                <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
                  Reopened
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Logged on {formatDateTime(incident.logTime)}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close incident details"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">
          {/* Incident Information */}
          <Section title="Incident Information">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              <DetailItem label="Incident ID" value={incident.incidentId} />
              <DetailItem label="Status" value={incident.status} />
              <DetailItem label="Priority" value={incident.priority} />
              <DetailItem label="Impact" value={incident.impact} />

              <DetailItem label="Category" value={incident.category} />
              <DetailItem label="Classification" value={incident.classification} />
              <DetailItem label="Department" value={incident.department} />
              <DetailItem label="Medium" value={incident.medium} />

              <DetailItem label="Workgroup" value={incident.workgroup} />
              <DetailItem label="Pending Code" value={incident.pendingCode} />
              <DetailItem
                label="Parent / Child"
                value={incident.parentChild}
              />
              <DetailItem label="Parent ID" value={incident.parentId} />

              <DetailItem
                label="ICD Ticket Number"
                value={incident.icdTicketNumber}
              />
              <DetailItem
                label="Specific Location"
                value={incident.specificLocation}
              />
              <DetailItem
                label="Application"
                value={incident.applicationName}
              />
              <DetailItem
                label="Dealer / Supplier Code"
                value={incident.dealerSupplierCode}
              />
            </div>
          </Section>

          {/* People */}
          <Section title="People & Assignment">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                label="Caller Name"
                value={incident.callerName}
              />

              <DetailItem
                label="Caller Email"
                value={incident.callerEmail}
              />

              <DetailItem
                label="Logged By"
                value={incident.loggedBy}
              />

              <DetailItem
                label="Assigned To"
                value={incident.assignedTo}
              />

              <DetailItem
                label="First Responded By"
                value={incident.assignedEngineerFirstResponded}
              />

              <DetailItem
                label="Dealer / Supplier Name"
                value={incident.dealerSupplierName}
              />

              <DetailItem
                label="Dealer / Supplier Location"
                value={incident.dealerSupplierLocation}
              />
            </div>
          </Section>

          {/* SLA */}
          <Section title="SLA Information">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Response SLA
                </p>

                <SlaBadge value={incident.responseSlaMet} />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Resolution SLA — Without Pending
                </p>

                <SlaBadge
                  value={incident.resolutionSlaMetWithoutPending}
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Resolution SLA — With Pending
                </p>

                <SlaBadge
                  value={incident.resolutionSlaMetWithPending}
                />
              </div>

              <DetailItem
                label="Reopened"
                value={incident.isReopen ? "Yes" : "No"}
              />

              <DetailItem
                label="Response Deadline"
                value={formatDateTime(incident.responseDeadline)}
              />

              <DetailItem
                label="Response Time"
                value={formatDateTime(incident.responseTime)}
              />

              <DetailItem
                label="Resolution Deadline"
                value={formatDateTime(incident.resolutionDeadline)}
              />

              <DetailItem
                label="Resolution Time"
                value={formatDateTime(incident.resolutionTime)}
              />

              <DetailItem
                label="Closure Date & Time"
                value={formatDateTime(incident.closureDateTime)}
              />

              <DetailItem
                label="Response SLA Violation"
                value={incident.responseSlaViolationReason}
                className="sm:col-span-2"
              />

              <DetailItem
                label="Resolution Violation"
                value={incident.resolutionViolationReason}
                className="sm:col-span-2"
              />
            </div>
          </Section>

          {/* Problem Details */}
          <Section title="Problem Details">
            <div className="space-y-5">
              <DetailItem label="Symptoms" value={incident.symptoms} />

              <DetailItem
                label="Description"
                value={incident.description}
              />

              <DetailItem
                label="Priority Change Reason"
                value={incident.priorityChangeReason}
              />
            </div>
          </Section>

          {/* Resolution */}
          <Section title="Resolution">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <DetailItem
                label="Resolution Code"
                value={incident.resolutionCode}
              />

              <DetailItem
                label="Cycle Time"
                value={
                  incident.cycleTimeInMin !== null &&
                  incident.cycleTimeInMin !== undefined
                    ? `${incident.cycleTimeInMin} min`
                    : "—"
                }
              />

              <DetailItem
                label="SLA Cycle Time"
                value={
                  incident.slaCycleTimeInMin !== null &&
                  incident.slaCycleTimeInMin !== undefined
                    ? `${incident.slaCycleTimeInMin} min`
                    : "—"
                }
              />
            </div>

            <div className="mt-5 space-y-5">
              <DetailItem
                label="Solution"
                value={incident.solution}
              />

              <DetailItem
                label="User Communication"
                value={incident.userCommunication}
              />
            </div>
          </Section>

          {/* Additional Information */}
          <Section title="Additional Information">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              <DetailItem
                label="Upload ID"
                value={upload?.id ?? incident.uploadId}
              />

              <DetailItem
                label="Source File"
                value={upload?.fileName}
              />

              <DetailItem
                label="Upload Date"
                value={formatDateTime(upload?.uploadedAt)}
              />

              <DetailItem
                label="Application"
                value={incident.applicationName}
              />
            </div>
          </Section>

          {/* Private Log */}
          {incident.privateLog && (
            <Section title="Private Log">
              <div className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {incident.privateLog}
              </div>
            </Section>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailModal;