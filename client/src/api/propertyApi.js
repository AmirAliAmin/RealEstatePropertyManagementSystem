import api from "./axios";

export const createProperty = async (data) => {
  const res = await api.post("/properties", data);
  return res.data;
};

export const getAllProperties = async () => {
  const res = await api.get("/properties");
  return res.data;
};

export const getPropertyById = async (id) => {
  const res = await api.get(`/properties/${id}`);
  return res.data;
};

export const updateProperty = async (id, data) => {
  const res = await api.patch(`/properties/${id}`, data);
  return res.data;
};

export const deleteProperty = async (id) => {
  const res = await api.delete(`/properties/${id}`);
  return res.data;
};
