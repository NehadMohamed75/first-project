import moment from "moment"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import StudentModel from "../models/student.js"
import CourseModel from "../models/course.js"

class StudentRepository{
    static getAllStudents(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const students = await StudentModel.find()
                return resolve(students)
            }
        ))
    }

    static getAllStudentsCount(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const students_counr = await StudentModel.countDocuments()
                return resolve(students_counr)
            }
        ))
    }

    static createStudent(data,image){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const courses = await CourseModel.find({
                    semester: 1,
                    year: 1,
                    program: data.program
                })

                const sememsters_degrees = courses.map((c) => {
                    return {
                        semester: c.semester,
                        year: c.year,
                        course: c.code,
                        marks: {
                            first_quiz: null,
                            second_quiz: null,
                            attendance: null,
                            practical: null,
                            midterm: null,
                            final: null
                        }
                    }
                })



                const students = await StudentModel.create({
                    ...data,
                    created_at: moment().format('DD/MM/YYYY HH:mm:ss'),
                    image: image,
                    sememsters_degrees: sememsters_degrees
                })
                return resolve(students)
            }
        ))
    }

    static deleteStudent(student_id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                await StudentModel.deleteOne({
                    _id: student_id
                })
                
                return resolve(true)
            }
        ))
    }

    static updateStudent(student_id, data, image){
        let temp_data = data
        if(image != null){
            data.image = image
        }

        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const updated_student = await StudentModel.updateOne({
                    _id: student_id
                }, temp_data)

                return resolve(updated_student)
            }
        ))
    }
}

export default StudentRepository