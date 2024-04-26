import mongoose from "mongoose";

const StudyTableSchema = new mongoose.Schema({
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

    pdf_file: {
        type: String,
        required: true,
    },

    created_at: {
        type: String,
        required: true,
    }
})

const StudyTableModel = mongoose.model('StudyTable', StudyTableSchema)

export default StudyTableModel