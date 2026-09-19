import { useEffect, useRef, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiFile,
  FiRefreshCw,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { getUploads, uploadExcel } from "../api/axios";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

function formatDate(dateString) {
  if (!dateString) return "—";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Home() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploads, setUploads] = useState([]);

  const [loadingUploads, setLoadingUploads] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [dragActive, setDragActive] = useState(false);

  const loadUploads = async () => {
    try {
      setLoadingUploads(true);

      const data = await getUploads();

      setUploads(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load uploads:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to load upload history."
      );
    } finally {
      setLoadingUploads(false);
    }
  };

  useEffect(() => {
    loadUploads();
  }, []);

  const validateFile = (file) => {
    if (!file) return false;

    const extension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (!["xlsx", "xls"].includes(extension)) {
      toast.error("Please select an Excel file (.xlsx or .xls).");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 20 MB.");
      return false;
    }

    return true;
  };

  const handleFile = (file) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }

    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an Excel file first.");
      return;
    }

    try {
      setUploading(true);

      const response = await uploadExcel(selectedFile);

      toast.success(
        response?.message ||
          `${selectedFile.name} uploaded successfully.`
      );

      setSelectedFile(null);

      await loadUploads();
    } catch (error) {
      console.error("Excel upload failed:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to upload the Excel file.";

      toast.error(
        typeof message === "string"
          ? message
          : "Failed to upload the Excel file."
      );
    } finally {
      setUploading(false);
    }
  };

  const removeSelectedFile = () => {
    if (uploading) return;

    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
              Toyota TKM
            </p>

            <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
              Incident Analytics
            </h1>
          </div>

          <a
            href="/dashboard"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Open Dashboard
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 py-8 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            Data Management
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Excel Upload & History
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Upload the monthly incident report to process and analyze
            incident records.
          </p>
        </div>

        {/* Upload section */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h3 className="text-base font-semibold text-slate-900">
              Upload Monthly Excel
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Supported formats: XLS and XLSX
            </p>
          </div>

          <div className="p-6">
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`rounded-xl border-2 border-dashed p-8 text-center transition ${
                dragActive
                  ? "border-red-500 bg-red-50"
                  : "border-slate-300 bg-slate-50"
              }`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-red-600 shadow-sm">
                <FiUploadCloud size={27} />
              </div>

              <h4 className="mt-4 text-sm font-semibold text-slate-900">
                Drop your Excel file here
              </h4>

              <p className="mt-1 text-sm text-slate-500">
                or select a file from your computer
              </p>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mt-5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Choose Excel File
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>

            {/* Selected file */}
            {selectedFile && (
              <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <FiFile size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {selectedFile.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeSelectedFile}
                  disabled={uploading}
                  className="ml-4 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}

            {/* Upload action */}
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {uploading ? (
                  <>
                    <FiRefreshCw className="animate-spin" size={17} />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiUploadCloud size={17} />
                    Upload File
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Upload history */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Upload History
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Previously processed Excel files
              </p>
            </div>

            <button
              type="button"
              onClick={loadUploads}
              disabled={loadingUploads}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiRefreshCw
                size={15}
                className={loadingUploads ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {loadingUploads ? (
            <div className="flex min-h-[220px] items-center justify-center">
              <div className="text-center">
                <FiRefreshCw
                  size={25}
                  className="mx-auto animate-spin text-red-600"
                />

                <p className="mt-3 text-sm text-slate-500">
                  Loading upload history...
                </p>
              </div>
            </div>
          ) : uploads.length === 0 ? (
            <div className="flex min-h-[220px] items-center justify-center px-6">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <FiClock size={21} />
                </div>

                <h4 className="mt-3 text-sm font-semibold text-slate-900">
                  No uploads yet
                </h4>

                <p className="mt-1 text-sm text-slate-500">
                  Uploaded Excel files will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      File
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Records
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Uploaded
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {uploads.map((upload) => (
                    <tr
                      key={upload.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                            <FiFile size={17} />
                          </div>

                          <div>
                            <p className="max-w-[360px] truncate text-sm font-medium text-slate-900">
                              {upload.fileName || "Unnamed file"}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Upload ID: {upload.id ?? "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {upload.recordCount?.toLocaleString("en-IN") ?? "—"}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDate(upload.uploadedAt)}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          <FiCheckCircle size={13} />
                          Processed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;