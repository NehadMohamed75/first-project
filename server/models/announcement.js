import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    importance: {
        type: String,
        default: 'normal',
        enum: ['normal', 'warning', 'high']
    },
    is_pinned: {
        type: Boolean,
        default: false
    },

    // created_by: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Staff'
    // }
})


const AnnouncementModel = mongoose.model('Announcement', AnnouncementSchema)

export default AnnouncementModel