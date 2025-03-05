import React, { useEffect, useState } from "react";
import { getUserProfile, getUserReports } from "../services/api";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);
                const reportsData = await getUserReports();
                setReports(reportsData);
            } catch (err) {
                setError("Failed to load user data");
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {error && <p className="error">{error}</p>}
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <h3>My Crime Reports</h3>
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
            ) : (
                <p>Loading user data...</p>
            )}
            <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
    );
};

export default UserProfile;
