import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getReports } from "../services/api";

const ReportList = () => {
    const { token } = useContext(AuthContext);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        getReports(token).then((res) => setReports(res.data)).catch((err) => console.error("Error:", err));
    }, [token]);

    return (
        <div>
            <h2>Crime Reports</h2>
            <ul>
                {reports.map((report) => (
                    <li key={report._id}>
                        <strong>{report.crimeType}</strong> - {report.location}
                        <p>{report.description}</p>
                        <small>Status: {report.status}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReportList;
