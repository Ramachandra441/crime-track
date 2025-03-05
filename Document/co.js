const User = require("models/User");

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.name = name || user.name;
        user.email = email || user.email;
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete user account
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.deleteOne();
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Server error" });
    }
};

