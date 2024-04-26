import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import StatisticsRepository from "../repositories/Statistics.js"

export const getStaffDashboardStatistics = asyncWrapper(
    async (req,res) => {
        const statistics = await StatisticsRepository.getStaffDashboardStatistics()

        return res.status(OK).json(statistics)
    }
)