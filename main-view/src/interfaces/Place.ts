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
