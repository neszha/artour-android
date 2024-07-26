import { type UserRoleEnum } from './enums'

export interface UserMeta {
    reviews: number
}

export interface ContributionSummary {
    placeTotal: number
    reviewTotal: number
}

export interface UserEntity {
    id: string
    avatar: string
    role: UserRoleEnum
    name: string
    email: string
    active: boolean
    lastLoginAt?: Date
    createdAt: Date
    updatedAt: Date

    userMeta?: UserMeta
    contributionSummary?: ContributionSummary
}
