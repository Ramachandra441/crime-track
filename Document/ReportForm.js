import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createReport } from "../services/api";

const ReportForm = () => {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({ crimeType: "", location: "", description: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createReport(formData, token);
        alert("Crime reported successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="crimeType" placeholder="Crime Type" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
            <button type="submit">Submit Report</button>
        </form>
    );
};

export default ReportForm;
