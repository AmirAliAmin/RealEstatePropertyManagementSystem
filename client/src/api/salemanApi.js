// salemanApi.js
import api from "./axios";

export const createSaleman = async (data) => {
  const res = await api.post("/saleman", data);
  return res.data;
};

export const getAllSaleman = async () => {
  const res = await api.get("/saleman");
  return res.data;
};

export const getSalemanById = async (id) => {
  const res = await api.get(`/saleman/${id}`);
  return res.data;
};

export const updateSaleman = async (id, data) => {
  const res = await api.patch(`/saleman/${id}`, data);
  return res.data;
};

export const deleteSaleman = async (id) => {
  const res = await api.delete(`/saleman/${id}`);
  return res.data;
};
