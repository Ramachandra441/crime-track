const Report = require("models/Report");

// Create a crime report
exports.createReport = async (req, res) => {
    try {
        const { crimeType, location, description } = req.body;

        if (!crimeType || !location || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const report = new Report({
            user: req.user._id,
            crimeType,
            location,
            description,
            status: "Pending",
        });

        await report.save();
        res.status(201).json({ message: "Crime reported successfully", report });
    } catch (error) {
        console.error("Error creating report:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get all reports (Admin only)
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find().populate("user", "name email");
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get reports by logged-in user
exports.getUserReports = async (req, res) => {
    try {
        const reports = await Report.find({ user: req.user._id });
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching user reports:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Update report status (Admin only)
exports.updateReportStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) return res.status(400).json({ error: "Status is required" });

        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ error: "Report not found" });

        report.status = status;
        await report.save();

        res.status(200).json({ message: "Report updated successfully", report });
    } catch (error) {
        console.error("Error updating report:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete a report (Admin only)
exports.deleteReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ error: "Report not found" });

        await report.deleteOne();
        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ error: "Server error" });
    }
};
