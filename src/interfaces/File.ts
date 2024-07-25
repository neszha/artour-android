export interface File {
    id: string
    userId: string
    type: string
    originalName: string
    filename: string
    size: string
    mimetype: string
    used: boolean
    createdAt: Date
    updatedAt: Date

    link?: string
}
