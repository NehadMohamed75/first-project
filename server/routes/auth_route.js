import { Router } from "express";
import { loginStaff, loginStudent, loginTeacher } from "../controllers/auth_controller.js";

const router = Router()

router.post('/auth/student', loginStudent)
router.post('/auth/teacher', loginTeacher)
router.post('/auth/staff', loginStaff)

export default router