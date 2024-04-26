import moment from "moment"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import CourseModel from "../models/course.js"
import StudentModel from "../models/student.js"

class CourseRepository{
    static getAllCourses(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const courses = await CourseModel.find()
                return resolve(courses)
            }
        ))
    }

    static getAllCoursesCount(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const courses_cound = await CourseModel.countDocuments()
                return resolve(courses_cound)
            }
        ))
    }

    static createCourse(data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const new_course = await CourseModel.create({
                    ...data,
                    created_at: moment().format('DD/MM/YYYY HH:mm:ss')
                })

                const matched_students = await StudentModel.find({
                    semester: new_course.semester,
                    year: new_course.year,
                    program: new_course.program
                })

                matched_students.map(async (student) => {
                    student.semesters_degrees.push({
                        semester: new_course.semester,
                        year: new_course.year,
                        course: new_course.code,
                        marks: {
                            first_quiz: null,
                            second_quiz: null,
                            attendance: null,
                            practical: null,
                            midterm: null,
                            final: null
                        }
                    })

                    await student.save()
                    return student
                })
                return resolve(new_course)
            }
        ))
    }

    static deleteCourse(course_id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                await CourseModel.deleteOne({
                    _id: course_id
                })
                
                return resolve(true)
            }
        ))
    }

    static updateCourse(course_id, data){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const updated_teacher = await CourseModel.updateOne({
                    _id: course_id
                }, data)

                return resolve(updated_teacher)
            }
        ))
    }
}

export default CourseRepository