import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'

import { port, host } from './config.js'
import { NOT_FOUND } from './constants/status_codes.js'
import ErrorHandlerMiddleware from './middlewares/error_handler.js'
import { fileURLToPath } from 'url'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cors()
)

app.use('/public',express.static(path.join(__dirname, './public')))

import ValidateApiToken from './middlewares/validate_api_token.js'
import StudentRoute from './routes/student_route.js'
import AnnouncementRoute from './routes/announcement_route.js'
import TeacherRoute from './routes/teacher_router.js'
import StaffRoute from './routes/staff_route.js'
import CourseRoute from './routes/course_router.js'
import StudyTableRoute from './routes/study_table_route.js'
import AuthRoute from './routes/auth_route.js'
import StatisticsRoute from './routes/statistics_route.js'

// public routes
app.use(
    '/api',
    AuthRoute,
)


// routes requires a valid api token
app.use(
    '/api',
    // ValidateApiToken,
    StudentRoute,
    AnnouncementRoute,
    TeacherRoute,
    StaffRoute,
    CourseRoute,
    StudyTableRoute,
    StatisticsRoute
)

app.use(ErrorHandlerMiddleware)

app.get('*', (req, res) => {
    return res.status(NOT_FOUND).json({
        error: '404 Not Found',
        url: req.url
    })
})

const main = async () => {
    try{
        let lib = await import('./utils/mongoose_connection.js')
        if(await lib.default){
            app.listen(port, () => console.log(`server listening on ${host}:${port}`))
        }
    }catch(err){
        logger.error(err.message)
    }
}
main()