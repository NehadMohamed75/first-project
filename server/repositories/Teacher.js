import moment from "moment"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import TeacherModel from "../models/teacher.js"
import StudentModel from "../models/student.js"

class TeacherRepository{
    static getAllTeachers(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const teachers = await TeacherModel
                .find({}, { __v: false })
                .populate({
                    path: 'courses',
                    ref: 'Course'
                })

                return resolve(teachers)
            }
        ))
    }

    static getAllTeachersCount(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const teachers_count = await TeacherModel.countDocuments()

                return resolve(teachers_count)
            }
        ))
    }

    static createTeacher(data,image){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const new_teacher = await TeacherModel.create({
                    ...data,
                    created_at: moment().format('DD/MM/YYYY HH:mm:ss'),
                    image: image,
                    courses: JSON.parse(data.courses)
                })
                return resolve(new_teacher)
            }
        ))
    }

    static deleteTeacher(teacher_id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                await TeacherModel.deleteOne({
                    _id: teacher_id
                })
                
                return resolve(true)
            }
        ))
    }

    static updateTeacher(teacher_id, data, image){
        let temp_data = data
        if(image != null){
            data.image = image
        }
        
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const updated_teacher = await TeacherModel.updateOne({
                    _id: teacher_id
                }, temp_data)

                return resolve(updated_teacher)
            }
        ))
    }

    static updateStudentDegree(student_id, degree_id, data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const student = await StudentModel.findOne({
                    _id: student_id
                })

                const semester_course_degrees = student.semesters_degrees.filter(sd => {
                    return sd._id == degree_id
                })[0]

                // console.log(semester_course_degrees.marks.);

                return resolve(true)
            }
        ))
    }
}

export default TeacherRepository