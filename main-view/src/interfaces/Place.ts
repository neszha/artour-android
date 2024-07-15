import { type File } from './File'
import { type UserEntity } from './User'
import { type PlaceStatusEnum, type MapMarkerEnum } from './enums'

export interface MapMarker {
    mapMarker: MapMarkerEnum
    url: string
}

export interface PlaceCategory {
    id: string
    name: string
    description: string
    mapMarker: string
    createdAt: Date
    updatedAt: Date
}

export interface OpeningHoursDay {
    dayIndex: number // 0 - 6
    closed: boolean
    fullOpeningHours: boolean // full open 24h
    openingHours: string
    closingHours: string
}

export interface OpeningHoursStatus {
    open: boolean
    content: string
}

export interface CreatePlaceDto {
    name: string
    description: string
    categoryId: string
    address: string
    latitude: number
    longitude: number
    mapImageIds: string[]
    mapImageCoverId: string
    openingHours: OpeningHoursDay[]
    website?: string
    phone: string
    price: number
    hashtags: string[]
}

export interface EditPlaceDto extends CreatePlaceDto {}

export interface PlaceEntity {
    id: string
    userId: string
    status: PlaceStatusEnum
    name: string
    description: string
    categoryId: string
    mapImageIds: any
    mapImageCoverId: string
    mapArImageCoverId: string
    latitude: number
    longitude: number
    address: string
    openingHours: OpeningHoursDay[]
    hashtags: string[]
    website?: string
    phone?: string
    price: number
    rating: number
    views: number
    like: number
    dislike: number
    saved: number
    createdAt: Date
    updatedAt: Date

    user?: UserEntity
    category: PlaceCategory
    mapImages?: File[]
    mapImageCover?: File
    mapArImageCover?: File
}
