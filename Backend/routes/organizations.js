import express from "express";
import checkToken from "../middlewares/checkToken.js";
import {
  getOrganizations,
  getOrganizationById,
  updateOrganizationStatus,
} from "../controller/organizationController.js";

const router = express.Router();

router.get("/", getOrganizations);

router.get("/:id", getOrganizationById);

router.patch("/:id/status", checkToken, updateOrganizationStatus);

export default router;