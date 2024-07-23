<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Foto Wisata" />

    <!-- image list  -->
    <section class="place-image-galery mt-3">
        <div class="image-list">
            <div v-for="image in images" :key="image.id" class="image-item">
                <img v-lazy="image.link" class="w-100" alt="...">
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { type File } from '@/interfaces/File'
import { API_URL_PLACES_IMAGES } from '@/constants/api-url'

export default {
    computed: {
        placeId (): string {
            return this.$route.params.placeId as string
        }
    },

    methods: {
        async getPlaceImages () {
            try {
                const url = API_URL_PLACES_IMAGES.replace(':placeId', this.placeId as string)
                const response: AxiosResponse = await axios.get(url)
                this.images = response.data.data as File[]
            } catch (error) {
                console.error(error)
                this.$router.push({ name: 'explore' })
            }
        }
    },

    beforeMount () {
        this.getPlaceImages()
    },

    data () {
        return {
            images: [] as File[]
        }
    }
}
</script>

<style scoped lang="scss">
.image-list {
    column-count: 2;
    column-gap: 6px;
    .image-item {
        display: inline-block;
        width: 100%;
        img {
            display:block;
            width: 100%;
        }
    }
}
</style>
