function getStatusColor(status) {
  switch (status) {
    case "OPEN":
      return "bg-red-100 text-red-700";

    case "CLOSED":
      return "bg-green-100 text-green-700";

    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function IncidentTable({
  incidents,
  pageData,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-5">
        Incident Records
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-slate-50">

              <th className="p-3 text-left">
                Incident
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Priority
              </th>

              <th className="p-3 text-left">
                Assigned To
              </th>

            </tr>

          </thead>

          <tbody>

            {incidents.map((incident) => (

              <tr
                key={incident.incidentId}
                className="
                  border-b
                  hover:bg-gray-50
                "
              >
                <td className="p-3">
                  {incident.incidentId}
                </td>

                <td className="p-3">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      ${getStatusColor(
                        incident.status
                      )}
                    `}
                  >
                    {incident.status}
                  </span>

                </td>

                <td className="p-3">
                  {incident.priority}
                </td>

                <td className="p-3">
                  {incident.assignedTo}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-5 text-sm text-gray-600">
        Total Records :
        {" "}
        {pageData.totalElements}
      </div>

    </div>
  );
}

export default IncidentTable;