import { type UserRoleEnum } from './enums'

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
}
