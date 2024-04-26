import { Router } from "express";
import { createCourse, deleteCourse, getAllCourses, getAllCoursesCount, updateCourse } from "../controllers/course_controller.js";

const router = Router()

router.get('/courses', getAllCourses)
router.post('/courses', createCourse)
router.delete('/courses/:id', deleteCourse)
router.put('/courses/:id', updateCourse)

router.get('/courses/count', getAllCoursesCount)
export default router