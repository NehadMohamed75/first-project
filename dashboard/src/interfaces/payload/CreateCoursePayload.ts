interface CreateCoursePayload{
    name: string
    code: string
    semester: 1 | 2
    year: 1 | 2 | 3 | 4,
    program: 'cs'|'is'|'ai'|'bi' | 'all'
}

export default CreateCoursePayload