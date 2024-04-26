interface Course{
    _id: string
    name: string
    code: string
    semester: 1 | 2
    year: 1 | 2 | 3 | 4
    program: 'cs'|'is'|'ai'|'bi' | 'all'
    created_at: string
}

export default Course