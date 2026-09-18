import { useState } from "react";
import { searchIncidents } from "../../api/axiosConfig.js";

function FiltersPanel({
  setIncidents,
  setPageData,
}) {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    impact: "",
    assignedTo: "",
    callerName: "",
    loggedBy: "",
  });

  const search = async (page = 0) => {
    try {
      const payload = {
        ...filters,
        page,
        size: 10,
      };

      const response =
        await searchIncidents(payload);

      setIncidents(response.data.content);

      setPageData({
        pageNumber: response.data.number,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.valuee,
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-xl font-semibold mb-4">
        Filters
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <select
          name="status"
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option value="">
            All Status
          </option>

          <option value="OPEN">
            OPEN
          </option>

          <option value="CLOSED">
            CLOSED
          </option>
        </select>

        <select
          name="priority"
          onChange={handleChange}
          className="border rounded-lg p-3"
        >
          <option value="">
            All Priority
          </option>

          <option value="P1">
            P1
          </option>

          <option value="P2">
            P2
          </option>

          <option value="P3">
            P3
          </option>
        </select>

        <input
          name="assignedTo"
          placeholder="Assigned To"
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          name="callerName"
          placeholder="Caller Name"
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

        <input
          name="loggedBy"
          placeholder="Logged By"
          onChange={handleChange}
          className="border rounded-lg p-3"
        />

      </div>

      <div className="mt-5 flex gap-3">

        <button
          onClick={() => search(0)}
          className="
            bg-red-700
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-red-800
          "
        >
          Search
        </button>

      </div>

    </div>
  );
}

export default FiltersPanel;