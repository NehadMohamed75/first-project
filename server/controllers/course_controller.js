import { static_files_host } from "../config.js"
import { OK } from "../constants/status_codes.js"
import asyncWrapper from "../middlewares/async_wrapper.js"
import CourseRepository from "../repositories/Course.js"

export const getAllCourses = asyncWrapper(
    async (req,res) => {
        const courses = await CourseRepository.getAllCourses()
        return res.status(OK).json(courses)
    }
)

export const getAllCoursesCount = asyncWrapper(
    async (req,res) => {
        const courses_count = await CourseRepository.getAllCoursesCount()
        return res.status(OK).json(courses_count)
    }
)

export const createCourse = asyncWrapper(
    async (req,res) => {
        const data = req.body

        const new_course = await CourseRepository.createCourse(data)
        return res.status(OK).json(new_course)
    }
)

export const deleteCourse = asyncWrapper(
    async (req,res) => {
        const {id} = req.params

        await CourseRepository.deleteCourse(id)
        return res.status(OK).json(true)
    }
)

export const updateCourse = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const data = req.body

        const updated_course = await CourseRepository.updateCourse(id,data)
        return res.status(OK).json(updated_course)
    }
)