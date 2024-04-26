import ApiInterface from "../ApiInterface";
import Course from "../Course";

interface CourseState extends ApiInterface{
    courses: Array<Course>,
    currentCourse: Course | null
}

export default CourseState