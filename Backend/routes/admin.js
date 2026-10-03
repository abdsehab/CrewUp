import express from "express";
import checkToken from "../middlewares/checkToken.js";
import { getAdminDashboardStats } from "../controller/adminController.js";

const router = express.Router();

router.get("/stats", checkToken, getAdminDashboardStats);

export default router;
