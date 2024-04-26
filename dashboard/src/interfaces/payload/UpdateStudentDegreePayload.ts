import Mark from "../Mark"

interface UpdateStudentDegreePayload{
    teacher_id: string
    student_id: string
    degree_id: string,
    data: {
        value: number,
        course: string,
        mark: Mark
    }
}

export default UpdateStudentDegreePayload