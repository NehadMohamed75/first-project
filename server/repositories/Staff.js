import moment from "moment"
import promiseAsyncWrapepr from "../middlewares/promise_async_wrapper.js"
import StaffModel from "../models/staff.js"
import CustomError from "../interfaces/custom_error_class.js"
import { BAD_REQUEST } from "../constants/status_codes.js"

class StaffRepository{
    static getAllStaffs(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const staffs = await StaffModel.find()
                return resolve(staffs)
            }
        ))
    }

    static getAllStaffsCount(){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const staffs_count = await StaffModel.countDocuments()
                return resolve(staffs_count)
            }
        ))
    }

    static getStaffById(id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                let staff = StaffModel.findOne({
                    _id: id
                })

                return resolve(staff)
            }
        ))
    }

    static createStaff(data,image){
        return new Promise(promiseAsyncWrapepr(
            async (resolve,reject) => {
                let staff = await StaffModel.findOne({
                    username: data.username
                })

                console.log(staff);

                if(staff){
                    const staff_username_already_exists = new CustomError('Username Already Exists', BAD_REQUEST)
                    return reject(staff_username_already_exists)
                }

                const new_staff = await StaffModel.create({
                    ...data,
                    created_at: moment().format('DD/MM/YYYY HH:mm:ss'),
                    image: image
                })
                return resolve(new_staff)
            }
        ))
    }

    static deleteStaff(staff_id){
        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                await StaffModel.deleteOne({
                    _id: staff_id
                })
                
                return resolve(true)
            }
        ))
    }

    static updateStaff(staff_id, data,image){
        let temp_data = data
        if(image != null){
            data.image = image
        }

        return new Promise(promiseAsyncWrapepr(
            async (resolve) => {
                const updated_staff = await StaffModel.updateOne({
                    _id: staff_id
                }, temp_data)

                return resolve(updated_staff)
            }
        ))
    }
}

export default StaffRepository