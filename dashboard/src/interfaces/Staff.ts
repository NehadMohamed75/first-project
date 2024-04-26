interface Staff{
    _id: string
    name: string
    username: string
    password: string
    image: string
    role: 'admin' | 'normal'
    created_at: string
}

export default Staff