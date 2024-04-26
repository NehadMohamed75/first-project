import { static_files_host } from "../config.js";
import { OK } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import AnnouncementRepository from "../repositories/Announcement.js";

export const getAllAnnouncements = asyncWrapper(
    async (req,res) => {
        const announcements = await AnnouncementRepository.getAllAnnouncements()
        return res.status(OK).json(announcements)
    }
)

export const getAllAnnouncementsCount = asyncWrapper(
    async (req,res) => {
        const announcements_count = await AnnouncementRepository.getAllAnnouncementsCount()
        return res.status(OK).json(announcements_count)
    }
)

export const createAnnouncement = asyncWrapper(
    async (req,res,next) => {
        const data = req.body
        if(!req.file){
            const image_not_provided_error = new CustomError('Announcement image not provided')
            return next(image_not_provided_error)
        }

        const image = static_files_host + 'images/announcements/' + req.file.filename
        const new_announcement = await AnnouncementRepository.createAnnouncement(data,image)
        return res.status(OK).json(new_announcement)
    }
)

export const deleteAnnouncement = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        await AnnouncementRepository.deleteAnnouncement(id)
        return res.status(OK).json(true)
    }
)

export const updateAnnouncement = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        const data = req.body

        const image = req.file != null ? static_files_host + 'images/announcements/' + req.file.filename : null

        const updated_announcement = await AnnouncementRepository.updateAnnouncement(id,data,image)
        return res.status(OK).json(updated_announcement)
    }
)