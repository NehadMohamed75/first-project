import { Router } from "express";
import { createStudent, deleteStudent, getAllStudentCurrentYearAndSemesterDegrees, getAllStudentDegrees, getAllStudents, getAllStudentsCount, updateStudent } from "../controllers/student_controller.js";

import multer from "multer";
import path from "path";
import Randomstring from "randomstring";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/students/')
    },
    filename: (req, file, cb) => {
      cb(null, `student_${Randomstring.generate(8)}${path.extname(file.originalname)}`)
    },
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/students', getAllStudents)
router.get('/students/:id/degrees/current', getAllStudentCurrentYearAndSemesterDegrees)
router.get('/students/:id/degrees', getAllStudentDegrees)

router.post('/students', upload.single('image'), createStudent)
router.delete('/students/:id', deleteStudent)
router.put('/students/:id',upload.single('image') ,updateStudent)

router.get('/students/count', getAllStudentsCount)

export default router