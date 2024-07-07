import { type MapMarkerEnum } from './enums'

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
    website: string
    phone: string
    hashtags: string[]
}
