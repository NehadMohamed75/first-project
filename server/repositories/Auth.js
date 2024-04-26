import jwt from 'jsonwebtoken'
import { jwt_secret_key } from '../config.js'
import StudentModel from '../models/student.js'
import CustomError from '../interfaces/custom_error_class.js'
import { BAD_REQUEST, INTERNAL_SERVER, NOT_FOUND } from '../constants/status_codes.js'
import StaffModel from '../models/staff.js'
import TeacherModel from '../models/teacher.js'
import promiseAsyncWrapper from '../middlewares/promise_async_wrapper.js'

class AuthRepository{
    static generateAuthToken(payload){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) => {
                try{
                    const token = jwt.sign(payload,jwt_secret_key,{
                        expiresIn: '2d'
                    })
                    return resolve(token)
                }catch(error){
                    const token_generation_error = new CustomError('valid to create token', INTERNAL_SERVER)
                    return reject()
                }
            }
        ))
    }
    
    static loginStudent(academic_number,national_id){
        return new Promise(promiseAsyncWrapper(
            async (resolve,reject) => {
                const student = await StudentModel.findOne({
                    academic_number:academic_number
                })

                if(student == null){
                    const student_not_found = new CustomError('No student found', NOT_FOUND)
                    return reject(student_not_found)
                }

                if(student.national_id != national_id){
                    const national_id_not_match = new CustomError('National ID not match', BAD_REQUEST)
                    return reject(national_id_not_match)
                }

                const token = await this.generateAuthToken({
                    username: academic_number,
                    role: 'student'
                })

                return resolve({
                    token: token,
                    role: 'student',
                    id: student._id,
                    user: student
                })
            }
        ))
    }
    
    static loginStaff(username, password){
        return new Promise(promiseAsyncWrapper(
            async (resolve,reject) => {
                const staff = await StaffModel.findOne({
                    username: username
                })

                if(staff == null){
                    const staff_not_found = new CustomError('No Administrative Employee found', NOT_FOUND)
                    return reject(staff_not_found)
                }

                if(staff.password != password){
                    const password_not_match = new CustomError('Password not match', BAD_REQUEST)
                    return reject(password_not_match)
                }

                const token = await this.generateAuthToken({
                    username: username,
                    role: 'staff'
                })

                return resolve({
                    token: token,
                    role: 'staff',
                    id: staff._id,
                    user: staff
                })
            }
        ))
    }
    
    static loginTeacher(username, password){
        return new Promise(promiseAsyncWrapper(
            async (resolve,reject) => {
                const teacher = await TeacherModel.findOne({
                    username: username
                }).populate([
                    {
                        path: 'courses',
                        ref: 'Course'
                    },
                    {
                        path: 'created_by',
                        ref: 'Staff'
                    }
                ])

                if(teacher == null){
                    const teacher_not_found = new CustomError('No teacher found', BAD_REQUEST)
                    return reject(teacher_not_found)
                }

                if(teacher.password != password){
                    const password_not_match = new CustomError('Password not match', BAD_REQUEST)
                    return reject(password_not_match)
                }

                const token = await this.generateAuthToken({
                    username: username,
                    role: 'teacher'
                })

                return resolve({
                    token: token,
                    role: 'teacher',
                    id: teacher._id,
                    user: teacher
                })
            }
        ))
    }
}

export default AuthRepository