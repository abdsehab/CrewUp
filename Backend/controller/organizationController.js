import Organization from "../model/organization.js";

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find().select("-__v");
    return res.status(200).json(organizations);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id).select("-__v");
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    return res.status(200).json(organization);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updateOrganizationStatus = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  const { status } = req.body;
  if (!["Pending", "Verified", "Suspended"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const verified = status === "Verified";
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      { status, verified },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }
    return res.status(200).json(organization);
  } catch (err) {
    return res.status(400).json(err);
  }
};