import { Router } from "express";
import { getStaffDashboardStatistics } from "../controllers/statistics_controller.js";

const router = Router()

router.get('/statistics/staff', getStaffDashboardStatistics)

export default router