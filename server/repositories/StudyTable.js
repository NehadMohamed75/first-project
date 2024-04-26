import moment from "moment"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import StudyTableModel from "../models/study_table.js"
import CustomError from "../interfaces/custom_error_class.js"
import { INTERNAL_SERVER } from "../constants/status_codes.js"

class StudyTableRepository{
    static getAllStudyTables(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const studyTables = await StudyTableModel
                .find()
                .sort({ year: 1 })

                return resolve(studyTables)
            }
        ))
    }

    static getAllStudyTablesCount(){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const study_tables_count = await StudyTableModel.countDocuments()

                return resolve(study_tables_count)
            }
        ))
    }

    static createStudyTable(data,file){
        return new Promise(promiseAsyncWrapper(
            async (resolve,reject) => {
                const search_table = await StudyTableModel.findOne({
                    semester: data.semester,
                    year: data.year
                })

                if(search_table){
                    const table_already_exists_error = new CustomError('Study table already exists', INTERNAL_SERVER)
                    return reject(table_already_exists_error)
                }

                const newStudyTable = await StudyTableModel.create({
                    ...data,
                    pdf_file: file,
                    created_at: moment().format('DD/MM/YYYY HH:mm:ss')
                })

                return resolve(newStudyTable)
            }
        ))
    }
    static updateStudyTable(id,data,file){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                const updated_study_table = await StudyTableModel.updateOne({
                    _id: id,
                }, {
                    ...data,
                    pdf_file: file
                })

                return resolve(updated_study_table)
            }
        ))
    }
    static deleteStudyTable(id){
        return new Promise(promiseAsyncWrapper(
            async (resolve) => {
                await StudyTableModel.deleteOne({
                    _id: id
                })

                return resolve(true)
            }
        ))
    }
}

export default StudyTableRepository