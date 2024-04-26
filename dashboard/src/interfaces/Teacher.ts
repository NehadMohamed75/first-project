import Course from "./Course"
import Staff from "./Staff"

interface Teacher{
    _id: string
    name: string
    username: string
    password: string
    image: string
    courses: Array<Course>
    created_by: Staff
}

export default Teacher