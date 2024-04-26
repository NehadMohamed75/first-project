import { static_files_host } from "../config.js"
import { OK } from "../constants/status_codes.js"
import CustomError from "../interfaces/custom_error_class.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import StaffRepository from "../repositories/Staff.js"

export const getAllStaffs = asyncWrapper(
    async (req,res) => {
        const staffs = await StaffRepository.getAllStaffs()
        return res.status(OK).json(staffs)
    }
)

export const getAllStaffsCount = asyncWrapper(
    async (req,res) => {
        const staffs_count = await StaffRepository.getAllStaffsCount()
        return res.status(OK).json(staffs_count)
    }
)

export const createStaff = asyncWrapper(
    async (req,res,next) => {
        const data = req.body

        if(!req.file){
            const image_not_provided_error = new CustomError('Administrative Employee Image Not Provided')
            return next(image_not_provided_error)
        }

        const image = static_files_host + 'images/staffs/' + req.file.filename

        const new_staff = await StaffRepository.createStaff(data,image)
        return res.status(OK).json(new_staff)
    }
)

export const deleteStaff = asyncWrapper(
    async (req,res) => {
        const {id} = req.params

        await StaffRepository.deleteStaff(id)
        return res.status(OK).json(true)
    }
)

export const updateStaff = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const data = req.body
        const image = req.file != null ? static_files_host + 'images/staffs/' + req.file.filename : null

        const updated_staff = await StaffRepository.updateStaff(id,data,image)
        return res.status(OK).json(updated_staff)
    }
)