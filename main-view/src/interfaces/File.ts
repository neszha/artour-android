export interface File {
    id: string
    type: string
    originalName: string
    filename: string
    size: string
    wordCount: number
    fee: number
    mimetype: string
    used: boolean
    foTest: boolean
    createdAt: Date
    updatedAt: Date

    // More fields.
    link?: string
}
