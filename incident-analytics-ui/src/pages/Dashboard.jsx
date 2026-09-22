import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
} from "react-icons/fi";

import { getUploads, searchIncidents } from "../api/axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";


import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardFilters from "../components/dashboard/DashboardFilters";
import KpiCard from "../components/dashboard/KpiCard";
import IncidentTable from "../components/dashboard/IncidentTable";
import IncidentDetailModal from "../components/dashboard/IncidentDetailModal";

import ResponseSlaChart from "../charts/ResponseSlaChart";
import ResolutionSlaChart from "../charts/ResolutionSlaChart";
import ActualResolutionSlaChart from "../charts/ActualResolutionSlaChart";
import StatusDistributionChart from "../charts/StatusDistributionChart";
import IncidentTrendChart from "../charts/IncidentTrendChart";
import Navbar from "../components/layout/navbar";

const PAGE_SIZE = 20;

const EMPTY_FILTERS = {
  uploadId: "",
  status: "",
  category: "",
  priority: "",
  impact: "",
  responseSlaMet: "",
  responseSlaViolationReason: "",
  resolutionSlaMetWithoutPending: "",
  resolutionSlaMetWithPending: "",
  isReopen: "",
  assignedEngineerFirstResponded: "",
  assignedTo: "",
  callerName: "",
  loggedBy: "",
  callerEmail: "",
  responseDeadlineFrom: "",
  responseDeadlineTo: "",
  responseTimeFrom: "",
  responseTimeTo: "",
};

const buildRequest = (filters) => {
  const request = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value === "" || value === null || value === undefined) {
      return;
    }

    if (
      [
        "responseSlaMet",
        "resolutionSlaMetWithoutPending",
        "resolutionSlaMetWithPending",
        "isReopen",
      ].includes(key)
    ) {
      request[key] = value === "true";
      return;
    }

    if (key.includes("From") || key.includes("To")) {
      request[key] = value;
      return;
    }

    request[key] = value;
  });

  if (request.uploadId) {
    request.uploadId = Number(request.uploadId);
  }

  return request;
};

const Dashboard = () => {
  //for URL search parameters - cliked on upload.id on home page, to filter the dashboard table and charts based on that upload id
  const [searchParams] = useSearchParams();
  //get the uploadId from the URL search parameters
  const uploadIdFromUrl = searchParams.get("uploadId");

  //initial filters for the dashboard, including the uploadId from the URL if present
  const initialFilters = useMemo(
    () => ({
      ...EMPTY_FILTERS,
      uploadId: uploadIdFromUrl || "",
    }),
    [uploadIdFromUrl],
  );

  const [uploads, setUploads] = useState([]);

  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const [analyticsData, setAnalyticsData] = useState([]);
  const [analyticsMeta, setAnalyticsMeta] = useState(null);

  const [incidents, setIncidents] = useState([]);
  const [tableMeta, setTableMeta] = useState(null);

  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  const [error, setError] = useState("");

  // Current table page
  const [page, setPage] = useState(0);

  // Currently selected incident for the detail modal
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Table sorting
  const [tableSort, setTableSort] = useState({
    sortBy: "incidentId",
    direction: "asc",
  });

  /*
   * Load upload history.
   */
  useEffect(() => {
    //not calling getUploads if uploadId is present in the URL, as we don't need to load all uploads in that case
    // if (uploadIdFromUrl) {
    //   return;
    // }
    const loadUploads = async () => {
      try {
        const data = await getUploads();
        console.log("Upload data fetched : ", data);
        setUploads(data || []);
        // toast.success("Excel Uploads fetched successfully");
      } catch (err) {
        console.error("Failed to load uploads:", err);
        toast.error("Error fetching the uploads");
      }
    };

    loadUploads();
  }, []);

  /*
   * Load complete analytics dataset.
   *
   * Maximum Excel size is 10,000 records,
   * so one request is enough.
   */
  const loadAnalytics = useCallback(async (filters) => {
    setLoadingAnalytics(true);
    setError("");

    try {
      const request = buildRequest(filters);

      console.log("Request {} : " , request);


      const response = await searchIncidents(request, {
        page: 0,
        size: 10000,
        sortBy: "incidentId",
        direction: "asc",
      });

      setAnalyticsData(response?.content || []);
      setAnalyticsMeta(response);
    } catch (err) {
      console.error("Failed to load analytics:", err);
      toast.error("Failed to load Analytics . Plz try again later");
      setAnalyticsData([]);
      setAnalyticsMeta(null);
      setError("Unable to load incident analytics. Please try again.");
    } finally {
      setLoadingAnalytics(false);
    }
  }, []);


  const loadTable = useCallback(
    async (
      filters,
      requestedPage = 0,
      requestedSortBy = "incidentId",
      requestedDirection = "asc",
    ) => {
      setLoadingTable(true);

      try {
        const request = buildRequest(filters);

        const response = await searchIncidents(request, {
          page: requestedPage,
          size: PAGE_SIZE,
          sortBy: requestedSortBy,
          direction: requestedDirection,
        });

        console.log("Repsonse data fecthed : " , response);
        // toast.success("Incidents fetched Successfully");

        setIncidents(response?.content || []);
        setTableMeta(response);
      } catch (err) {
        console.error("Failed to load incidents:", err);

        toast.error("Failed to load incidents");

        setIncidents([]);
        setTableMeta(null);
        setError("Unable to load incident records. Please try again.");
      } finally {
        setLoadingTable(false);
      }
    },
    [],
  );

  /*
   * Initial dashboard load.
   */
  useEffect(() => {
    loadAnalytics(initialFilters);

    loadTable(initialFilters, 0, "incidentId", "asc");
  }, [initialFilters, loadAnalytics, loadTable]);

  /*
   * Apply filters.
   *
   * Both analytics and table are refreshed.
   * Pagination returns to page 1.
   */
  const handleApplyFilters = async () => {
    setPage(0);

    const newFilters = {
      ...draftFilters,
    };

    setAppliedFilters(newFilters);

    await Promise.all([
      loadAnalytics(newFilters),
      loadTable(newFilters, 0, tableSort.sortBy, tableSort.direction),
    ]);

    toast.info("Dashboard Updated.");
  };

  /*
   * Reset filters.
   */
  const handleResetFilters = async () => {
    setDraftFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setPage(0);
    toast.info("Filter reset");

    await Promise.all([
      loadAnalytics(EMPTY_FILTERS),
      loadTable(EMPTY_FILTERS, 0, tableSort.sortBy, tableSort.direction),
    ]);
  };

  /*
   * Filter field changes do NOT trigger API calls.
   */
  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setDraftFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * Pagination only reloads the table.
   *
   * Analytics data does NOT need to be fetched again.
   */
  const handlePageChange = async (newPage) => {
    if (newPage < 0) return;

    if (tableMeta?.totalPages && newPage >= tableMeta.totalPages) {
      return;
    }

    setPage(newPage);

    await loadTable(
      appliedFilters,
      newPage,
      tableSort.sortBy,
      tableSort.direction,
    );
  };

  /*
   * Sorting only reloads the table.
   */
  const handleSort = async (sortBy, direction) => {
    setTableSort({
      sortBy,
      direction,
    });

    setPage(0);

    await loadTable(appliedFilters, 0, sortBy, direction);
  };

  /*
   * KPI calculations.
   */
  const totalIncidents = analyticsMeta?.totalElements ?? analyticsData.length;

  const openIncidents = analyticsData.filter(
    (incident) => incident.status === "OPEN",
  ).length;

  const resolvedIncidents = analyticsData.filter(
    (incident) =>
      incident.status === "RESOLVED" || incident.status === "CLOSED",
  ).length;

  const responseSlaMet = analyticsData.filter(
    (incident) => incident.responseSlaMet === true,
  ).length;

  const responseSlaApplicable = analyticsData.filter(
    (incident) =>
      incident.responseSlaMet !== null && incident.responseSlaMet !== undefined,
  ).length;

  const responseSlaPercentage =
    responseSlaApplicable > 0
      ? Math.round((responseSlaMet / responseSlaApplicable) * 100)
      : 0;

  const reopenedIncidents = analyticsData.filter(
    (incident) => incident.isReopen === true,
  ).length;

  const selectedUpload = appliedFilters.uploadId;

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">
            <DashboardHeader
              selectedUpload={selectedUpload}
              uploads={uploads}
            />

            {/* Error */}
            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <FiAlertCircle className="h-5 w-5 text-red-600" />

                <p className="text-sm text-red-700">{error}</p>

                <button
                  type="button"
                  onClick={() => {
                    loadAnalytics(appliedFilters);

                    loadTable(
                      appliedFilters,
                      page,
                      tableSort.sortBy,
                      tableSort.direction,
                    );
                  }}
                  className="ml-auto inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  <FiRefreshCw className="h-4 w-4" />
                  Retry
                </button>
              </div>
            )}

            <DashboardFilters
              filters={draftFilters}
              uploads={uploads}
              onChange={handleFilterChange}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              loading={loadingAnalytics || loadingTable}
            />

            {/* KPI section */}
            {loadingAnalytics && !analyticsMeta ? (
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-32 animate-pulse rounded-xl border border-gray-200 bg-white"
                  />
                ))}
              </div>
            ) : (
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                  title="Total Incidents"
                  value={totalIncidents.toLocaleString()}
                  subtitle="Current filtered dataset"
                  icon={FiAlertCircle}
                />

                <KpiCard
                  title="Open Incidents"
                  value={openIncidents.toLocaleString()}
                  subtitle="Currently open"
                  icon={FiClock}
                />

                <KpiCard
                  title="Resolved / Closed"
                  value={resolvedIncidents.toLocaleString()}
                  subtitle="Resolved or closed"
                  icon={FiCheckCircle}
                />

                <KpiCard
                  title="Response SLA"
                  value={`${responseSlaPercentage}%`}
                  subtitle={`${responseSlaMet.toLocaleString()} incidents met SLA`}
                  icon={FiCheckCircle}
                />
              </div>
            )}

            {/* Secondary KPI information */}
            {!loadingAnalytics && analyticsData.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-3">
                <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                  <span className="text-xs text-gray-500">Reopened</span>

                  <span className="ml-2 text-sm font-semibold text-gray-900">
                    {reopenedIncidents.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Analytics charts */}
            {!loadingAnalytics && analyticsData.length > 0 && (
              <div className="mb-6 space-y-6">
                <ResponseSlaChart incidents={analyticsData} />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <StatusDistributionChart incidents={analyticsData} />

                  <IncidentTrendChart incidents={analyticsData} />
                </div>

                <ResolutionSlaChart incidents={analyticsData} />
                <ActualResolutionSlaChart incidents={analyticsData} />
              </div>
            )}

            {/* Incident table */}
            <IncidentTable
              incidents={incidents}
              loading={loadingTable}
              page={page}
              pageSize={PAGE_SIZE}
              totalElements={tableMeta?.totalElements ?? 0}
              totalPages={tableMeta?.totalPages ?? 0}
              sortBy={tableSort.sortBy}
              direction={tableSort.direction}
              onPageChange={handlePageChange}
              onSort={handleSort}
              onRowClick={setSelectedIncident}
            />
          </div>

          {/* Incident detail modal */}
          <IncidentDetailModal
            incident={selectedIncident}
            onClose={() => setSelectedIncident(null)}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
