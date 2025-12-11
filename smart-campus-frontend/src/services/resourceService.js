import api from "./api";

export const getAllResources = async () => {
  const res = await api.get("/api/resources");
  return res.data;
};

export const createResource = async (payload) => {
  const res = await api.post("/api/resources", payload);
  return res.data;
};

export const updateResource = async (id, payload) => {
  const res = await api.put(`/api/resources/${id}`, payload);
  return res.data;
};

export const deleteResource = async (id) => {
  await api.delete(`/api/resources/${id}`);
};

// getAvailableResources
export const getAvailableResources = async () => {
  const res = await api.get("/api/resources/available"); // apna endpoint daalna
  return res.data;
};