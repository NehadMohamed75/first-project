import Degree from "./Degree"
import Staff from "./Staff"

interface Student{
    _id: string
    full_name: string
    national_id: string
    academic_number: string
    birth_date: string
    address: string
    phone_number: string
    program: 'cs' | 'is' | 'ai' | 'bi'
    email: string
    image: string
    year: 1 | 2 | 3 | 4
    semester: 1 | 2
    created_at: string,
    created_by: Staff
    semesters_degrees: Array<Degree>
}

export default Student