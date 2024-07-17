<script setup lang="ts">
import numeral from 'numeral'
</script>

<template>
    <section class="action-button mb-2 pt-1">
        <div class="action-item d-flex gap-2 mb-2">

            <RouterLink v-if="isPlaceOwner" :to="{ name: 'place:manage', params: { placeId: place.id }}"
                class="btn btn-outline-primary border-base waves-effect waves-light" style="border-style: dashed;">
                <i class="bi bi-pencil-square Tempat me-2"></i>
                <span>Kelola</span>
            </RouterLink>

            <button @click="openGoogleMapDirectionLink()" class="btn btn-primary border-base waves-effect waves-light">
                <i class="bi bi-sign-turn-right-fill me-2"></i>
                <span>Buka Rute</span>
            </button>

            <button
                v-if="metaData.like.setted"
                @click="likePlace()"
                class="btn btn-neutral border-primary text-primary waves-effect waves-dark">
                <i class="bi bi-hand-thumbs-up-fill me-2"></i>
                <span>Like ({{ numeral(metaData.like.count || 0).format('0.[0]a').toUpperCase() }})</span>
            </button>
            <button
                v-else
                  @click="likePlace()"
                class="btn btn-neutral border-dark waves-effect waves-dark">
                <i class="bi bi-hand-thumbs-up me-2"></i>
                <span>Like ({{ numeral(metaData.like.count || 0).format('0.[0]a').toUpperCase() }})</span>
            </button>

            <button
                v-if="metaData.dislike.setted"
                @click="dislikePlace()"
                class="btn btn-neutral border-primary text-primary waves-effect waves-dark">
                <i class="bi bi-hand-thumbs-down-fill me-2"></i>
                <span>Dislike ({{ numeral(metaData.dislike.count || 0).format('0.[0]a').toUpperCase() }})</span>
            </button>
            <button
                v-else
                  @click="dislikePlace()"
                class="btn btn-neutral border-dark waves-effect waves-dark">
                <i class="bi bi-hand-thumbs-down me-2"></i>
                <span>Dislike ({{ numeral(metaData.dislike.count || 0).format('0.[0]a').toUpperCase() }})</span>
            </button>

            <button
                v-if="metaData.saved.setted"
                @click="addToBookmark()"
                class="btn btn-neutral border-primary text-primary waves-effect waves-dark">
                <i class="bi bi-bookmark-plus-fill me-2"></i>
                <span>Simpan ({{ numeral(metaData.saved.count || 0).format('0.[0]a').toUpperCase() }})</span>
            </button>
            <button
                v-else
                  @click="addToBookmark()"
                class="btn btn-neutral border-dark waves-effect waves-dark">
                <i class="bi bi-bookmark-plus me-2"></i>
                <span>Simpan ({{ numeral(metaData.saved.count || 0).format('0.[0]a').toUpperCase() }})</span>
            </button>

            <button class="btn btn-neutral border-dark waves-effect waves-dark">
                <i class="bi bi-share-fill me-2"></i>
                <span>Bagikan</span>
            </button>

        </div>
    </section>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user.store'
import { type PlaceEntity } from '@/interfaces/Place'
import { API_URL_PLACE_ACTION_METADATA, API_URL_PLACE_ADD_BOOKMARKS, API_URL_PLACE_DISLIKE, API_URL_PLACE_LIKE } from '@/constants/api-url'
import axios from '@/helpers/axios.helper'
import { type AxiosResponse } from 'axios'

export default {

    computed: {
        ...mapState(useUserStore, ['myInfo']),

        place (): PlaceEntity {
            return this.placeData as PlaceEntity
        },

        isPlaceOwner (): boolean {
            if (this.place.user === undefined) return false
            return (this.place.user.id === this.myInfo.id)
        }
    },

    methods: {
        async getActionMetaData () {
            try {
                const url = API_URL_PLACE_ACTION_METADATA.replace(':placeId', this.place.id as string)
                const response: AxiosResponse = await axios.get(url)
                this.metaData = response.data.data
            } catch (error) {
                console.error(error)
            }
        },

        openGoogleMapDirectionLink () {
            const googleMapLink = `https://www.google.com/maps/dir/?api=1&destination=${this.place.latitude},${this.place.longitude}`
            if (window.Android !== undefined) {
                window.Android.openExternalLink(googleMapLink)
                return
            }
            window.open(googleMapLink, '_blank')
        },

        async likePlace () {
            try {
                const url = API_URL_PLACE_LIKE.replace(':placeId', this.place.id as string)
                await axios.post(url)
            } catch (error) {
                console.error(error)
            }
            await this.getActionMetaData()
        },

        async dislikePlace () {
            try {
                const url = API_URL_PLACE_DISLIKE.replace(':placeId', this.place.id as string)
                await axios.post(url)
            } catch (error) {
                console.error(error)
            }
            await this.getActionMetaData()
        },

        async addToBookmark () {
            try {
                const url = API_URL_PLACE_ADD_BOOKMARKS.replace(':placeId', this.place.id as string)
                await axios.post(url)
            } catch (error) {
                console.error(error)
            }
            await this.getActionMetaData()
        }
    },

    beforeMount () {
        this.getActionMetaData()
    },

    data () {
        return {
            metaData: {
                like: {
                    count: 0,
                    setted: false
                },
                dislike: {
                    count: 0,
                    setted: false
                },
                saved: {
                    count: 0,
                    setted: false
                }
            }
        }
    },

    props: {
        placeData: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.action-button {
    overflow-x: scroll;
    scroll-behavior: smooth;
    display: grid;
    .action-item {
        padding: 0 1rem;
        .btn{
            display: flex;
            text-wrap: nowrap;
        }
    }
}
</style>
