import { Router } from "express";

import multer from "multer";
import path from "path";
import Randomstring from "randomstring";
import { createStudyTable, deleteStudyTable, getAllStudyTables, getAllStudyTablesCount, updateStudyTable } from "../controllers/study_table_controller.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/files/tables/')
    },
    filename: (req, file, cb) => {
      cb(null, `table_${Randomstring.generate(8)}${path.extname(file.originalname)}`)
    },
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/tables', getAllStudyTables)
router.post('/tables', upload.single('file'), createStudyTable)
router.delete('/tables/:id', deleteStudyTable)
router.put('/tables/:id',upload.single('file'), updateStudyTable)

router.get('/tables/count', getAllStudyTablesCount)

export default router