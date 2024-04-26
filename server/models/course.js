import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    code: {
        type: String,
        required: true
    },

    program: {
        type: String,
        required: true,
        enum: ['cs','is','ai','bi', 'all']
    },

    semester: {
        type: Number,
        required: true,
        enum: [1,2]
    },

    year: {
        type: Number,
        required: true,
        enum: [1,2,3,4]
    },

    created_at: {
        type: String,
        required: true
    }
})

const CourseModel = mongoose.model('Course', CourseSchema)

export default CourseModel