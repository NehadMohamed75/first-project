interface SystemNotification{
    _id: string
    title: string
    body: string
    created_at: string,
    importance: 'high' | 'normal' | 'warning'
}

export default SystemNotification