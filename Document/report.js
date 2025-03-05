const express = require("express");
const auth = require("../middleware/auth");
const Report = require("models/Report");

const router = express.Router();

// Route to submit a crime report
router.post("/submit", auth, async (req, res) => {
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
            status: "Pending" // Default status
        });

        await report.save();
        res.status(201).json({ message: "Crime reported successfully", report });
    } catch (error) {
        console.error("Error submitting report:", error);
        res.status(500).json({ error: "Server error, please try again later" });
    }
});

// Route to get all crime reports (Admin only)
router.get("/", auth, async (req, res) => {
    try {
        const reports = await Report.find().populate("user", "name email");
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to get reports by the logged-in user
router.get("/my-reports", auth, async (req, res) => {
    try {
        const reports = await Report.find({ user: req.user._id });
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching user reports:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to update report status (Admin only)
router.put("/update/:id", auth, async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: "Status field is required" });
        }

        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        report.status = status;
        await report.save();

        res.status(200).json({ message: "Report updated successfully", report });
    } catch (error) {
        console.error("Error updating report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to delete a crime report (Admin only)
router.delete("/delete/:id", auth, async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        await report.deleteOne();
        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
