import { type File } from './File'
import { type PlaceEntity } from './Place'
import { type UserEntity } from './User'

export interface PlaceReviewEntity {
    id: string
    userId: string
    placeId: string
    rating: number
    content: string
    imageIds: any
    createdAt: Date
    updatedAt: Date

    user?: UserEntity
    place?: PlaceEntity
    images?: File[]
}
