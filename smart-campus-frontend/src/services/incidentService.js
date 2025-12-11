import api from "./api";

export const reportIncident = async (reporterId, payload) => {
  const res = await api.post(`/api/incidents?reporterId=${reporterId}`, payload);
  return res.data;
};

export const getOpenIncidents = async () => {
  const res = await api.get("/api/incidents/open");
  return res.data;
};
