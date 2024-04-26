import { Router } from "express";
import { 
    createAnnouncement, 
    deleteAnnouncement, 
    getAllAnnouncements, 
    getAllAnnouncementsCount, 
    updateAnnouncement
} from "../controllers/announcement_controller.js";

import Randomstring from "randomstring";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/announcements/')
    },
    filename: (req, file, cb) => {
      cb(null, `announcement_${Randomstring.generate(8)}${path.extname(file.originalname)}`)
    },
})

const upload = multer({ storage: storage })

const router = Router()

router.get('/announcements', getAllAnnouncements)
router.post('/announcements', upload.single('image') , createAnnouncement)
router.delete('/announcements/:id', deleteAnnouncement)
router.put('/announcements/:id',upload.single('image'), updateAnnouncement)

router.get('/announcements/count', getAllAnnouncementsCount)

export default router