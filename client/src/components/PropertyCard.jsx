import React, { useEffect, useState } from "react";
import { getAllProperties } from "../api/propertyApi";
import loginbg from '../assets/login-bg.png'

export default function PropertyCard() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProperties();
        console.log("Properties from backend:", res);
        setProperties(res); // Save fetched properties
        
      } catch (err) {
        console.error("Error fetching properties", err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4">
      {properties.map((property) => (
        <div key={property._id} className="border rounded p-4">
          <img
          src={property.propertyImg}
            alt={property.title}
            className="w-full h-40 border object-cover rounded"
          />
          <h2 className="text-lg font-bold">{property.title}</h2>
          <p>{property.discription}</p>
          <p className="text-green-600">Price: {property.price}</p>
          <p className="text-gray-500">Location: {property.location}</p>
        </div>
      ))}
    </div>
  );
}
