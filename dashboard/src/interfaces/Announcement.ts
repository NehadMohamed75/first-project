interface Announcement{
    _id: string
    title: string
    description: string
    image: string
    created_at: string
    importance: 'high' | 'normal' | 'warning'
    is_pinned: boolean
}

export default Announcement