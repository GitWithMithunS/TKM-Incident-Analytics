import axios from "axios";

const api = axios.create({
  baseURL:  "http://localhost:8091/api",
  // baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8091/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadExcel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getUploads = async () => {
  const response = await api.get("/uploads");
  return response.data;
};

export const searchIncidents = async (
  request = {},
  {
    page = 0,
    size = 20,
    sortBy = "incidentId",
    direction = "asc",
  } = {}
) => {
  const response = await api.post("/incidents/search", request, {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  });

  return response.data;
};

export default api;