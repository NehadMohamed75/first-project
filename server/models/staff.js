import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
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

    role: {
        type: String,
        default: 'normal',
        enum: ['admin', 'normal']
    }
})


const StaffModel = mongoose.model('Staff', StaffSchema)


export default StaffModel