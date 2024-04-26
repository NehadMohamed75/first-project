import { Router } from "express";
import { createStaff, deleteStaff, getAllStaffs, getAllStaffsCount, updateStaff } from "../controllers/staff_controller.js";

import multer from "multer";
import path from "path";
import Randomstring from "randomstring";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/staffs/')
    },
    filename: (req, file, cb) => {
      cb(null, `staff_${Randomstring.generate(8)}${path.extname(file.originalname)}`)
    },
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/staffs', getAllStaffs)
router.post('/staffs', upload.single('image'), createStaff)
router.delete('/staffs/:id', deleteStaff)
router.put('/staffs/:id', upload.single('image'), updateStaff)

router.get('/staffs/count', getAllStaffsCount)

export default router