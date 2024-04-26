import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },

    national_id:{
        type: String,
        required: true
    },

    academic_number:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone_number: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        default: 1,
        enum: [1,2,3,4]
    },

    program: {
        type: String,
        required: true,
        enum: ['cs','is','ai','bi']
    },

    birth_date: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    semester: {
        type: Number,
        default: 1,
        enum: [1,2]
    },

    created_at: {
        type: String,
        required: true
    },

    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },

    semesters_degrees: [{
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

        course: {
            type: String,
            required: true
        },

        marks: {
            first_quiz: {
                name: {
                    type: String,
                    default: "First Quiz",
                    enum: ["First Quiz"]
                },
                key:{
                    type: String,
                    default: "FQ",
                    enum: ["FQ"]
                },
                constraints: {
                    type: Number,
                    default: 5,
                    enum: [5]
                },
                value: {
                    type: Number,
                    default: null
                }
            },
            second_quiz: {
                name: {
                    type: String,
                    default: "Second Quiz",
                    enum: ["Second Quiz"]
                },
                key:{
                    type: String,
                    default: "SQ",
                    enum: ["SQ"]
                },
                constraints: {
                    type: Number,
                    default: 5,
                    enum: [5]
                },
                value: {
                    type: Number,
                    default: null
                }
            },
            attendance: {
                name: {
                    type: String,
                    default: "Attendance",
                    enum: ["Attendance"]
                },
                key:{
                    type: String,
                    default: "ATTD",
                    enum: ["ATTD"]
                },
                constraints: {
                    type: Number,
                    default: 5,
                    enum: [5]
                },
                value: {
                    type: Number,
                    default: null
                }
            },
            practical: {
                name: {
                    type: String,
                    default: "Practical",
                    enum: ["Practical",]
                },
                key:{
                    type: String,
                    default: "PRACT",
                    enum: ["PRACT"]
                },
                constraints: {
                    type: Number,
                    default: 15,
                    enum: [15]
                },
                value: {
                    type: Number,
                    default: null
                }
            },
            midterm: {
                name: {
                    type: String,
                    default: "Midterm",
                    enum: ["Midterm",]
                },
                key:{
                    type: String,
                    default: "MID",
                    enum: ["MID"]
                },
                constraints: {
                    type: Number,
                    default: 20,
                    enum: [20]
                },
                value: {
                    type: Number,
                    default: null
                }
            },
            final: {
                name: {
                    type: String,
                    default: "Final Exam",
                    enum: ["Final Exam"]
                },
                key:{
                    type: String,
                    default: "FEXM",
                    enum: ["FEXM"]
                },
                constraints: {
                    type: Number,
                    default: 50,
                    enum: [50]
                },
                value: {
                    type: Number,
                    default: null
                }
            }
        }
    }]
})

const StudentModel = mongoose.model('Student', StudentSchema)

export default StudentModel