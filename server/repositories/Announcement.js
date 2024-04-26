import moment from "moment"
import AnnouncementModel from "../models/announcement.js"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"

class AnnouncementRepository{
    static getAllAnnouncements(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const announcements = await AnnouncementModel.find()
                return resolve(announcements)
            }
        ))
    }

    static getAllAnnouncementsCount(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const announcements_count = await AnnouncementModel.countDocuments()
                return resolve(announcements_count)
            }
        ))
    }

    static createAnnouncement(data, image){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const new_announcement = await AnnouncementModel.create({
                    ...data,
                    image: image,   
                    created_at: moment().format('DD.MM.YYYY HH:mm:ss')
                })
                return resolve(new_announcement)
            }
        ))
    }

    static deleteAnnouncement(announcement_id) {
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                await AnnouncementModel.deleteOne({
                    _id: announcement_id
                })

                return resolve(true)
            }
        ))
    }

    static updateAnnouncement(announcement_id, data, image){
        let temp_data = data
        if(image != null){
            data.image = image
        }

        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const updated_announcement = await AnnouncementModel.updateOne({
                    _id: announcement_id
                }, temp_data)

                return resolve(updated_announcement)
            }
        ))
    }
}

export default AnnouncementRepository