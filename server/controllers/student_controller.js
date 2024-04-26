import { static_files_host } from "../config.js"
import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import StudentRepository from "../repositories/Student.js"

export const getAllStudents = asyncWrapper(
    async (req,res) => {
        const students = await StudentRepository.getAllStudents()
        return res.status(OK).json(students)
    }
)

export const getAllStudentsCount = asyncWrapper(
    async (req,res) => {
        const students = await StudentRepository.getAllStudentsCount()
        return res.status(OK).json(students)
    }
)

export const getAllStudentCurrentYearAndSemesterDegrees = asyncWrapper(
    async (req,res) => {
        const students = await StudentRepository.getAllStudents()
        return res.status(OK).json(students)
    }
)

export const getAllStudentDegrees = asyncWrapper(
    async (req,res) => {
        const students = await StudentRepository.getAllStudents()
        return res.status(OK).json(students)
    }
)

export const createStudent = asyncWrapper(
    async (req,res) => {
        const data = req.body

        if(!req.file){
            const image_not_provided_error = new CustomError('Student Image Not Provided')
            return next(image_not_provided_error)
        }

        const image = static_files_host + 'images/students/' + req.file.filename

        const new_student = await StudentRepository.createStudent(data, image)
        return res.status(OK).json(new_student)
    }
)

export const deleteStudent = asyncWrapper(
    async (req,res) => {
        const {id} = req.params

        await StudentRepository.deleteStudent(id)
        return res.status(OK).json(true)
    }
)

export const updateStudent = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const data = req.body
        const image = req.file != null ? static_files_host + 'images/students/' + req.file.filename : null

        const updated_student = await StudentRepository.updateStudent(id,data,image)
        return res.status(OK).json(updated_student)
    }
)