import { OK } from "../constants/status_codes.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import AuthRepository from "../repositories/Auth.js";

export const loginTeacher = asyncWrapper(
    async (req,res) => {
        const {username,password} = req.body
        const result = await AuthRepository.loginTeacher(username,password)
        return res.status(OK).json(result)
    }
)

export const loginStudent = asyncWrapper(
    async (req,res) => {
        const {national_id, academic_number} = req.body
        const result = await AuthRepository.loginStudent(academic_number,national_id)
        return res.status(OK).json(result)
    }
)

export const loginStaff = asyncWrapper(
    async (req,res) => {
        const {username,password} = req.body
        const result = await AuthRepository.loginStaff(username,password)
        return res.status(OK).json(result)
    }
)