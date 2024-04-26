import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import AnnouncementModel from "../models/announcement.js"
import CourseModel from "../models/course.js"
import StaffModel from "../models/staff.js"
import StudentModel from "../models/student.js"
import StudyTableModel from "../models/study_table.js"
import TeacherModel from "../models/teacher.js"

class StatisticsRepository{
    static getStaffDashboardStatistics(){
        return new Promise(promiseAsyncWrapper(
            async (resolve, reject) => {
                let teachers_count = await TeacherModel.countDocuments()
                let students_count = await StudentModel.countDocuments()
                let courses_count = await CourseModel.countDocuments()
                let tables_count = await StudyTableModel.countDocuments()
                let staffs_count = await StaffModel.countDocuments()
                let announcements_count = await AnnouncementModel.countDocuments()

                const statistics = {
                    teachers_count: teachers_count,
                    students_count: students_count,
                    courses_count: courses_count,
                    tables_count: tables_count,
                    staffs_count: staffs_count,
                    announcements_count: announcements_count
                }

                console.log(statistics);

                return resolve(statistics)
            }
        ))
    }
}

export default StatisticsRepository