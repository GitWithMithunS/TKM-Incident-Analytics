import { useEffect, useState } from "react";
import { getUploads } from "../../api/axiosConfig.js"
import { useNavigate } from "react-router-dom";

function UploadTable() {

  const navigate = useNavigate();

  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    loadUploads();
  }, []);

  const loadUploads = async () => {

    try {
      const response = await getUploads();
      setUploads(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-4">
        Uploaded Files
      </h2>

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th>ID</th>
            <th>File Name</th>
            <th>Records</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {uploads.map((upload) => (

            <tr
              key={upload.id}
              className="border-b hover:bg-gray-50"
            >
              <td>{upload.id}</td>

              <td>{upload.fileName}</td>

              <td>{upload.recordCount}</td>

              <td>{upload.uploadedAt}</td>

              <td>

                <button
                  onClick={() =>
                    navigate(`/dashboard/${upload.id}`)
                  }
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default UploadTable;