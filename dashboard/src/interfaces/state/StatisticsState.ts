import ApiInterface from "../ApiInterface"

interface StatisticsState extends ApiInterface{
    statistics: {
        staffs_count: number
        courses_count: number
        students_count: number
        announcements_count: number
        teachers_count: number
        tables_count: number
    }
}

export default StatisticsState