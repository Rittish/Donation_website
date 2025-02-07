import React, { useEffect, useState } from "react";
import "./AdminDashboard.scss";
import { motion } from "framer-motion";

export const AdminDashboard = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/getFormData');
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch form data');
      }
    } catch (error) {
      console.error('Error fetching form data:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {loading && <p>Loading form data...</p>}
      {error && <p className="error">{error}</p>}
      <div className="form-data-container">
        {formData.map((data) => (
          <motion.div
            key={data._id}
            className="form-data-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Donation Details</h2>
            <p><strong>Type:</strong> {data.type}</p>
            <p><strong>Bags:</strong> {data.bags}</p>
            <p><strong>Help Groups:</strong> {data.helpGroups.join(", ")}</p>
            <p><strong>Location:</strong> {data.location}</p>
            <p><strong>Organisation:</strong> {data.organisation}</p>
            <p><strong>Address:</strong> {`${data.street}, ${data.city}, ${data.postcode}`}</p>
            <p><strong>Phone:</strong> {data.phone}</p>
            <p><strong>Collection Day:</strong> {data.day}</p>
            <p><strong>Collection Time:</strong> {data.time}</p>
            {data.notes && <p><strong>Notes:</strong> {data.notes}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};