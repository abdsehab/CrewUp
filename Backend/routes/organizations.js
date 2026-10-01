import express from "express";
import checkToken from "../middlewares/checkToken.js";
import {
  getOrganizations,
  getOrganizationById,
} from "../controller/organizationController.js";

const router = express.Router();

router.get("/", getOrganizations);

router.get("/:id", getOrganizationById);

export default router;