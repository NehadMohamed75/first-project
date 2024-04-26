interface Degree{
    _id: string
    semester: 1 | 2,
    year: 1 | 2 | 3 | 4,

    course: string,

    marks: {
        first_quiz: {
            name: string
            value: number
            constraints: number
            key: string
        },
        second_quiz: {
            name: string
            value: number
            constraints: number
            key: string
        },
        attendance: {
            name: string
            value: number
            constraints: number
            key: string
        },
        practical: {
            name: string
            value: number
            constraints: number
            key: string
        },
        midterm: {
            name: string
            value: number
            constraints: number
            key: string
        },
        final: {
            name: string
            value: number
            constraints: number
            key: string
        }
    }
}

export default Degree