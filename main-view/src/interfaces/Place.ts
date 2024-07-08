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

export interface CreatePlaceDto {
    name: string
    description: string
    categoryId: string[]
    address: string[]
    latitude: number
    longitude: number
    mapImageIds: string[]
    mapImageCoverId: string
    website: string
    phone: string
    price: number
    hashtags: string[]
}

export interface PlaceEntity {
    id: string
    userId: string
    status: PlaceStatusEnum
    name: string
    description: string
    categoryId: string
    mapImageIds: any
    latitude: number
    longitude: number
    address: string
    openingHours?: any
    website?: string
    phone?: string
    price: number
    rating: number
    viwes: number
    like: number
    dislike: number
    saved: number
    createdAt: Date
    updatedAt: Date

    category: PlaceCategory
    mapImages?: File[]
    mapImageCover?: File
}
