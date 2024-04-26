import { Router } from "express";
import { createTeacher, deleteTeacher, getAllTeachers, getAllTeachersCount, updateStudentDegree, updateTeacher } from "../controllers/teacher_controller.js";

import multer from "multer";
import path from "path";
import Randomstring from "randomstring";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/teachers/')
    },
    filename: (req, file, cb) => {
      cb(null, `teacher_${Randomstring.generate(8)}${path.extname(file.originalname)}`)
    },
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/teachers', getAllTeachers)
router.post('/teachers', upload.single('image'),createTeacher)
router.delete('/teachers/:id', deleteTeacher)
router.put('/teachers/:id',upload.single('image'), updateTeacher)

router.put('/teachers/:id/students/:student_id/degrees/:degree_id',updateStudentDegree)

router.get('/teachers/count', getAllTeachersCount)

export default router