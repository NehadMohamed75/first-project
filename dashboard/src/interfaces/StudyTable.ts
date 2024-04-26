interface StudyTable{
    _id: string
    semester: 1 | 2
    year: 1 | 2 | 3 | 4
    pdf_file: string
    created_at: string
    program: 'cs' | 'is' | 'ai' | 'bi'
}

export default StudyTable