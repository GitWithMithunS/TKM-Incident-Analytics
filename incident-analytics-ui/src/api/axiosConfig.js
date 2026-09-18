import axios from "axios";

const api =  axios.create({
  baseURL: "http://localhost:8091/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export const uploadExcel = async (formData) => {
  return await api.post("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUploads = async () => {
  return await api.get("/uploads");
};

export const searchIncidents = async (payload) => {
  return await api.post("/incidents/search", payload);
};


