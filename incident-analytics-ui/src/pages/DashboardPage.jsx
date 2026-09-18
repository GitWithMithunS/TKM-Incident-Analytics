import { useState } from "react";
import { FaCarSide } from "react-icons/fa";

import DashboardStats from "../components/dashboard/DashboardStats";
import FiltersPanel from "../components/dashboard/FiltersPanel";
import IncidentTable from "../components/dashboard/IncidentTable";

function DashboardPage() {
  const [incidents, setIncidents] = useState([]);

  const [pageData, setPageData] = useState({
    pageNumber: 0,
    totalPages: 0,
    totalElements: 0,
  });

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Hero Banner */}

      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white">

        <div className="max-w-7xl mx-auto px-8 py-8">

          <div className="flex items-center gap-4">

            <FaCarSide size={40} />

            <div>
              <h1 className="text-3xl font-bold">
                Toyota Incident Analytics
              </h1>

              <p className="text-red-100">
                Dealer Support Operations Dashboard
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-6">

        <DashboardStats
          incidents={incidents}
        />

        <div className="mt-6">
          <FiltersPanel
            setIncidents={setIncidents}
            setPageData={setPageData}
          />
        </div>

        <div className="mt-6">
          <IncidentTable
            incidents={incidents}
            pageData={pageData}
          />
        </div>

      </div>

    </div>
  );
}

export default DashboardPage;



// import Navbar from "../components/layout/Navbar";

// function DashboardPage() {
//   return (
//     <>
//       <Navbar />

//       <div className="bg-gray-100 p-8 min-h-screen">

//         <h2 className="text-2xl font-bold mb-6">
//           Dashboard
//         </h2>

//         {/* Stats */}

//         {/* Charts */}

//         {/* Filters */}

//         {/* Table */}

//       </div>

//     </>
//   );
// }

// export default DashboardPage;