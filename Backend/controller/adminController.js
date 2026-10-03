import Organization from "../model/organization.js";
import Event from "../model/event.js";

export const getAdminDashboardStats = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied" });
    }

    try {
        const [totalOrganizations, activeEvents, pendingApprovals, recentApplications] = await Promise.all([
            Organization.countDocuments(),
            Event.countDocuments({ status: { $ne: "Completed" } }),
            Organization.countDocuments({ status: "Pending" }),
            Organization.find({ status: "Pending" }).sort({ _id: -1 }).limit(5)
        ]);

        return res.status(200).json({
            totalOrganizations,
            activeEvents,
            pendingApprovals,
            recentApplications,
        });
    } catch (err) {
        return res.status(400).json({ error: "Failed to fetch stats" });
    }
};
