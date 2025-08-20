import api from "./axios";

export  const createProperty = async (data) => {
    const res = await api.post("/properties", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
}

export  const getAllProperties = async () => {
    const res = await api.get("/properties");
    return res.data;
}

export  const getPropertyById = async () => {
    const res = await api.get(`/properties/${id}`);
    return res.data;
}

export const updateProperty = async (data) => {
     const res = await api.patch(`/properties/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
}

export  const deleteProperty = async () => {
    const res = await api.delete(`/properties/${id}`);
    return res.data;
}