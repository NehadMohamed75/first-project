import { static_files_host } from "../config.js"
import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import TeacherRepository from "../repositories/Teacher.js"

export const getAllTeachers = asyncWrapper(
    async (req,res) => {
        const teachers = await TeacherRepository.getAllTeachers()
        
        return res.status(OK).json(teachers)
    }
)

export const getAllTeachersCount = asyncWrapper(
    async (req,res) => {
        const teachers_count = await TeacherRepository.getAllTeachersCount()
        
        return res.status(OK).json(teachers_count)
    }
)

export const createTeacher = asyncWrapper(
    async (req,res) => {
        const data = req.body
        const image = static_files_host + 'images/teachers/' + req.file.filename

        const new_teacher = await TeacherRepository.createTeacher(data, image)
        return res.status(OK).json(new_teacher)
    }
)

export const deleteTeacher = asyncWrapper(
    async (req,res) => {
        const {id} = req.params

        await TeacherRepository.deleteTeacher(id)
        return res.status(OK).json(true)
    }
)

export const updateTeacher = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const data = req.body
        const image = req.file

        const updated_teacher = await TeacherRepository.updateTeacher(id,data,image)
        return res.status(OK).json(updated_teacher)
    }
)

export const updateStudentDegree = asyncWrapper(
    async (req,res) => {
        const {id,student_id,degree_id} = req.params
        const data = req.body
        console.log(data);

        await TeacherRepository.updateStudentDegree(student_id,degree_id,data)
        return res.status(OK).json(true)
    }
)
