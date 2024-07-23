<script setup lang="ts">
import classNames from 'classnames'
</script>

<template>
    <div @click="toPlaceDetailView()" class="card">
        <div class="card-box-img">
            <img :src="imageCoverLink" alt="..." class="card-img">
        </div>
        <div class="card-body p-2">
            <div class="head d-flex justify-content-between align-items-center">
                <h3 class="title h4">
                    {{ place.name }}
                </h3>
                <div @click="addToBookmark" class="save-action px-2">
                    <i v-if="savedToBookmark" class="bi bi-bookmark-fill text-primary"></i>
                    <i v-else class="bi bi-bookmark"></i>
                </div>
            </div>
            <div class="list-info">
                <div class="d-flex align-items-center">
                    <i class="bi bi-geo-alt-fill me-2 text-muted"></i>
                    <span class="address text-sm text-heading text-primary-hover">
                        {{ place.address }}
                    </span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-alarm-fill me-2 text-muted"></i>
                    <div class="text-sm text-heading text-primary-hover">
                        <span :class="classNames({
                            'text-primary': (openingHoursStatus.open === true),
                            'text-danger': (openingHoursStatus.open === false),
                        })">{{ openingHoursStatus.content }}</span>
                    </div>
                </div>
            </div>
            <div class="rating d-flex gap-1">
                <i v-for="i of 5" :key="i" :class="classNames({
                    'bi-star': (place.rating <= i - 1),
                    'bi-star-half': (place.rating > i - 1 && place.rating < i),
                    'bi-star-fill': (place.rating >= i),
                })" class="bi text-warning"></i>
                <span>({{ place.rating.toFixed(2) }})</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { type OpeningHoursDay, type OpeningHoursStatus, type PlaceEntity } from '@/interfaces/Place'
import { usePlaceStore } from '@/stores/place.store'
import { type File } from '@/interfaces/File'
import { getPlaceOpenHourStatus } from '@/helpers/time.helper'
import { API_URL_PLACE_ACTION_METADATA, API_URL_PLACE_ADD_BOOKMARKS } from '@/constants/api-url'
import axios from '@/helpers/axios.helper'
import { type AxiosResponse } from 'axios'

export default {
    computed: {
        ...mapState(usePlaceStore, ['placeSearchList']),

        place (): PlaceEntity {
            return this.placeSearchList.find(place => place.id === this.placeId) as PlaceEntity
        },

        imageCoverLink (): string {
            if (this.place.mapImageCover === undefined) return ''
            const fileData = this.place.mapImageCover as unknown as File
            return fileData.link ?? ''
        },

        openingHoursStatus (): OpeningHoursStatus {
            const openingHours = this.place.openingHours.find(openingHours => openingHours.dayIndex === this.dayIndex) as OpeningHoursDay
            return getPlaceOpenHourStatus(openingHours)
        }
    },

    methods: {
        toPlaceDetailView (): void {
            this.$router.push({ name: 'place:detail', params: { placeId: this.placeId } })
        },

        async getPlaceActionMetaData (): Promise<void> {
            try {
                const url = API_URL_PLACE_ACTION_METADATA.replace(':placeId', this.place.id as string)
                const response: AxiosResponse = await axios.get(url)
                const metaData = response.data.data
                this.savedToBookmark = metaData?.saved?.setted as boolean
            } catch (error) {
                console.error(error)
            }
        },

        async addToBookmark (event: Event) {
            event.stopPropagation()
            try {
                const url = API_URL_PLACE_ADD_BOOKMARKS.replace(':placeId', this.place.id as string)
                await axios.post(url)
            } catch (error) {
                console.error(error)
            }
            await this.getPlaceActionMetaData()
        }
    },

    beforeMount () {
        this.getPlaceActionMetaData()
    },

    data () {
        return {
            dayIndex: new Date().getDay(),
            savedToBookmark: false
        }
    },

    props: {
        placeId: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    .card {
        display: flex !important;
        flex-direction: row !important;
        width: 340px;

        .card-box-img {
            width: 90px;
            height: 100px;
            overflow: hidden;
            flex-shrink: 0;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .card-body {
            overflow: hidden;

            .title {
                font-size: 14px;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                text-wrap: nowrap;
            }
        }

        .list-info {
            font-size: 12px;

            .address {
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        .rating {
            font-size: 12px;
        }
    }
</style>
