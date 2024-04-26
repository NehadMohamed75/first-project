import ApiInterface from "../ApiInterface";
import Student from "../Student";
import Teacher from "../Teacher";

interface TeacherState extends ApiInterface{
    teachers: Array<Teacher>,
    currentTeacher: Teacher | null,
    currentControlledStudent: Student | null
}

export default TeacherState