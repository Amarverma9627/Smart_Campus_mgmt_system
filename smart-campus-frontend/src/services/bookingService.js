import api from "./api";

export const createBooking = async (userId, payload) => {
  const res = await api.post(`/api/bookings?userId=${userId}`, payload);
  return res.data;
};

export const getUserBookings = async (userId) => {
  const res = await api.get(`/api/bookings/user/${userId}`);
  return res.data;
};

export const getAllBookings = async () => {
  const res = await api.get("/api/bookings"); // apna endpoint daalna
  return res.data;
};