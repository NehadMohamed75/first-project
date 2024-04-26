import ApiInterface from "../ApiInterface"
import Staff from "../Staff"
import Student from "../Student"
import Teacher from "../Teacher"

interface AuthState extends ApiInterface{
    token: string | null,
    role: 'staff' | 'student' | 'teacher' | null,
    currentUserData: Teacher | Student | Staff | null
}

export default AuthState