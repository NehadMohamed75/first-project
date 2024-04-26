import { static_files_host } from "../config.js";
import { BAD_REQUEST, NOT_FOUND, OK } from "../constants/status_codes.js";
import CustomError from "../interfaces/custom_error_class.js";
import asyncWrapper from "../middlewares/async_wrapper.js";
import StudyTableRepository from "../repositories/StudyTable.js";

export const getAllStudyTables = asyncWrapper(
    async (req,res) => {
        const tables = await StudyTableRepository.getAllStudyTables()
        return res.status(OK).json(tables)
    }
)

export const getAllStudyTablesCount = asyncWrapper(
    async (req,res) => {
        const tables_count = await StudyTableRepository.getAllStudyTablesCount()
        return res.status(OK).json(tables_count)
    }
)

export const createStudyTable = asyncWrapper(
    async (req,res,next) => {
        const data = req.body
        
        if(!req.file){
            const file_not_provided_error = new CustomError('File not provided', NOT_FOUND)
            return next(file_not_provided_error)
        }

        if(req.file.mimetype != "application/pdf"){
            const file_not_supported_error = new CustomError('File is not supported', BAD_REQUEST)
            return next(file_not_supported_error)
        }

        const file = static_files_host + 'files/tables/' + req.file.filename

        const new_table = await StudyTableRepository.createStudyTable(data,file)
        return res.status(OK).json(new_table)
    }
)

export const updateStudyTable = asyncWrapper(
    async (req,res) => {
        const data = req.body
        const {id} = req.params

        if(req.file != null && req.file.mimetype != 'application/pdf'){
            const file_not_supported_error = new CustomError('File is not supported', BAD_REQUEST)
            return next(file_not_supported_error)
        }
        const file = req.file != null ? static_files_host + 'files/tables/' + req.file.filename : null

        const updated_table = await StudyTableRepository.updateStudyTable(id,data,file)
        return res.status(OK).json(updated_table)
    }
)

export const deleteStudyTable = asyncWrapper(
    async (req,res) => {
        const {id} = req.params
        await StudyTableRepository.deleteStudyTable(id)
        return res.status(OK).json(true)
    }
)