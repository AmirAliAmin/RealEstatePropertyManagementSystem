import React, { useEffect, useState } from "react";
import {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties
} from "../../api/propertyApi";

export default function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    discription: "",
    price: "",
    location: "",
    propertyImg: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to load properties:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await getAllProperties();
      setProperties(data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Save new or updated property
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  for (let key in formData) {
    if (formData[key]) data.append(key, formData[key]);
  }

  // 🚨 TEMP: hardcode or pass userId
  data.append("createdBy", "66c4e7e...yourUserId");

  if (editingProperty) {
    await updateProperty(editingProperty._id, data);
  } else {
    await createProperty(data);
  }

  setFormData({ title: "", discription: "", price: "", location: "", propertyImg: null });
  setEditingProperty(null);
  loadProperties();
};

  // Delete property
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await deleteProperty(id);
      setProperties(properties.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting property:", err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Manage Properties</h1>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-100">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 mr-2 mb-2"
          required
        />
        <input
          type="text"
          name="discription"
          value={formData.discription}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 mr-2 mb-2"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 mr-2 mb-2"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 mr-2 mb-2"
          required
        />
        <input
          type="file"
          name="propertyImg"
          onChange={handleChange}
          className="border p-2 mr-2 mb-2"
          accept="image/*"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingProperty ? "Update Property" : "Add Property"}
        </button>
        {editingProperty && (
          <button
            type="button"
            onClick={() => {
              setEditingProperty(null);
              setFormData({ title: "", discription: "", price: "", location: "", propertyImg: null });
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Properties Table */}
      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <table className="min-w-full border bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length > 0 ? (
              properties.map((p) => (
                <tr key={p._id} className="hover:bg-gray-100">
                  <td className="p-2 border">{p.title}</td>
                  <td className="p-2 border">{p.discription}</td>
                  <td className="p-2 border">${p.price}</td>
                  <td className="p-2 border">{p.location}</td>
                  <td className="p-2 border">
                    {p.propertyImg && (
                      <img
                        src={p.propertyImg}
  alt="property"
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProperty(p);
                        setFormData({
                          title: p.title,
                          discription: p.discription,
                          price: p.price,
                          location: p.location,
                          propertyImg: null,
                        });
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan="6">
                  No properties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
