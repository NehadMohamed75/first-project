import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }],

    image: {
        type: String,
        required: true
    },

    created_at: {
        type: String,
        required: true
    },

    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    }
})

const TeacherModel = mongoose.model('Teacher', TeacherSchema)

export default TeacherModel