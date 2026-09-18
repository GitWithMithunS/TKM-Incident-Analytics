import { useState } from "react";
import { uploadExcel } from "../../api/axiosConfig.js";
import { toast } from "react-toastify";

function UploadCard() {

  const [file, setFile] = useState();

  const handleUpload = async () => {

    if (!file) {
      toast.error("Select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadExcel(formData);

      toast.success("Upload successful");

    } catch (error) {

      toast.error("Upload failed" , error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">

      <h2 className="text-xl font-semibold mb-4">
        Upload Excel
      </h2>

      <div className="flex gap-4">

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>

      </div>

    </div>
  );
}

export default UploadCard;