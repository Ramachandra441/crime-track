import React, { useEffect, useState } from "react";
import { getUserReports } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reportsData = await getUserReports();
                setReports(reportsData);
            } catch (err) {
                setError("Failed to load reports");
            }
        };
        fetchReports();
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            {error && <p className="error">{error}</p>}
            <button onClick={() => navigate("/report-crime")}>Report a Crime</button>
            
            <h3>My Reports</h3>
            {reports.length > 0 ? (
                <ul>
                    {reports.map((report) => (
                        <li key={report._id}>
                            <strong>{report.crimeType}</strong> - {report.location}
                            <p>{report.description}</p>
                            <p><strong>Status:</strong> {report.status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reports found.</p>
            )}
        </div>
    );
};

export default Dashboard;
