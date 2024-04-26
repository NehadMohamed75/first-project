import ApiInterface from "../ApiInterface";
import Student from "../Student";

interface StudentState extends ApiInterface{
    students: Array<Student>,
    currentStudent: Student | null
}

export default StudentState