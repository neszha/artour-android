<script setup lang="ts">
import moment from 'moment'
import classNames from 'classnames'
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import MapPreviewMarker from '@components/maps/MapPreviewMarker.vue'
import ModalOpeningHoursDay from '@components/modals/ModalOpeningHoursDay.vue'
</script>

<template>
    <HeaderNavbar nav-title="Edit Tempat Wisata" />

    <!-- main content -->
    <section class="mt-4 mb-3">
        <form @submit.prevent="updatePlace" class="container-fluid">
            <div class="row">

                <div class="col-12">
                    <div class="mb-3">
                        <h4 class="mb-1">Detail Tempat</h4>
                        <p class="text-sm text-muted">Masukan informasi tentang tempat ini yang akan ditampilkan secara publik.</p>
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Nama Tempat <span class="text-danger">*</span></label>
                    <input v-model="form.data.name" type="text" class="form-control" placeholder="Tambahkan nama tempat" required>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Deskripsi Tempat <span class="text-danger">*</span></label>
                    <textarea v-model="form.data.description" class="form-control" rows="8" required placeholder="Deskripsi tempat"></textarea>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Ketegori <span class="text-danger">*</span></label>
                    <select v-model="form.data.categoryId" class="form-select" required>
                        <option value="">-- Pilih Kategory --</option>
                        <option v-for="(category) in placeCategories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Alamat <span class="text-danger">*</span></label>
                    <input v-model="form.data.address" type="text" class="form-control" placeholder="Masukan detail alamat" required>
                </div>
                <div class="col-12 mb-3">
                    <MapPreviewMarker
                        v-if="!form.gettingData"
                        @update:location="updateMarkerLocation"
                        :defaultLocation="{latitude: form.data.latitude, longitude: form.data.longitude}"
                    />
                </div>

                <div class="col-12 pt-2">
                    <div class="mb-3">
                        <h4 class="mb-1">Detail Lainnya</h4>
                        <p class="text-sm text-muted">Masukan informasi lokasi lainnya.</p>
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Jam Buka <span class="text-danger">*</span></label>
                        <div class="card" style="border-radius: 8px;">
                            <div class="card-body d-flex flex-column gap-2">
                                <div v-for="item of form.data.openingHours" :key="item.dayIndex" class="d-flex gap-3 justify-content-between">
                                    <div>
                                        {{ moment().locale('id').day(item.dayIndex).format('dddd') }}
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <small class="text-primary d-flex align-items-center">
                                            <span v-if="item.closed" class="text-danger">Tutup</span>
                                            <span v-else-if="item.fullOpeningHours">Buka 24 Jam</span>
                                            <span v-else>{{ item.openingHours }} - {{ item.closingHours }}</span>
                                        </small>
                                        <button @click="openModalOpeningHours(item.dayIndex)" type="button" class="btn btn-sm btn-light border-0 shadow-none waves-effect waves-dark">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Biaya Pengunjung <span class="text-danger">*</span></label>
                        <input v-model="form.data.price" type="number" class="form-control" min="0" placeholder="Biaya (Rp.)" required>
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Kontak <span class="text-danger">*</span></label>
                        <input v-model="form.data.phone" type="text" class="form-control" placeholder="Nomor telepon" required>
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Website</label>
                        <input v-model="form.data.website" type="url" class="form-control" placeholder="Situs web">
                    </div>
                </div>

                <div class="col-12 pt-2">
                    <div class="mb-3">
                        <h4 class="mb-1">Foto Tempat <span class="text-danger">*</span></h4>
                        <p class="text-sm text-muted">Tambahkan beberapa foto tempat mimimal 4 foto.</p>
                    </div>
                    <div class="col-12 mb-3">
                        <input ref="fileImageInputGalerry" @change="uploadImagePlace" type="file" class="d-none" multiple accept="image/*">
                        <input ref="fileImageInputCamerra" @change="uploadImagePlace" type="file" class="d-none" capture="user" accept="image/*">
                        <div class="d-flex gap-2">
                            <button @click="($refs.fileImageInputGalerry as HTMLInputElement).click()" type="button" class="btn btn-sm btn-neutral border-base waves-effect waves-dark">
                                <span class="pe-2">
                                    <i class="bi bi-images"></i>
                                </span>
                                <span>Tambahkan Foto</span>
                            </button>
                            <button @click="($refs.fileImageInputCamerra as HTMLInputElement).click()" type="button" class="btn btn-sm btn-neutral border-base waves-effect waves-dark">
                                <span class="pe-2">
                                    <i class="bi bi-camera-fill"></i>
                                </span>
                                <span>Ambil Gambar</span>
                            </button>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mt-2 image-scrollable-x">
                            <div class="d-flex gap-2">
                                <div
                                    v-for="file of mapImages"
                                    :key="file.id"
                                    :class="classNames({'map-image-cover': (file.id === form.data.mapImageCoverId)})"
                                    @click="form.data.mapImageCoverId = file.id"
                                    class="col-auto image-item rounded">
                                    <div @click="unusedPlaceImage(file.id)" class="close-button">
                                        <i class="bi bi-x-circle"></i>
                                    </div>
                                    <img alt="..." :src="file.link">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 pt-2">
                    <div class="mb-3">
                        <h4 class="mb-1">Hashtags</h4>
                        <p class="text-sm text-muted">Tambahkan beberapa hashtags untuk mempermudah pengguna mencari tempat berdasarkan hashtags.</p>
                    </div>
                    <div class="col-12 mb-3">
                        <div class="col-12 mb-3">
                            <div class="hashtag-preview mb-2">
                                <small>
                                    <strong v-for="(hashtag) of form.data.hashtags" :key="hashtag" class="me-2">#{{ hashtag }}</strong>
                                </small>
                            </div>
                            <textarea @input="parsingHastagString" ref="textareaHahstag" class="form-control" placeholder="Contoh: #pantai #wisata_pantai"></textarea>
                        </div>
                    </div>
                </div>

                <div class="col-12 pt-4">
                    <div class="mb-2">
                        <div class="d-flex gap-3 justify-content-center">
                            <div class="d-grid w-100">
                                <button @click="$router.back()" type="button" class="btn btn-md btn-neutral border-base waves-effect waves-dark">Batal</button>
                            </div>
                            <div class="d-grid w-100">
                                <button :disabled="form.loading" class="btn btn-md btn-primary waves-effect waves-light">
                                    <span v-if="form.loading">Menyimpan...</span>
                                    <span v-else>Simpan</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    </section>

    <!-- modals  -->
     <ModalOpeningHoursDay id="modal_opening_hours_day" @saved="setNewOpeningHoursDay" />
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { isAxiosError, type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { type File } from '@/interfaces/File'
import { usePlaceStore } from '@/stores/place.store'
import { useModalStore } from '@/stores/modal.store'
import { type Coordinates } from '@/interfaces/Geolocation'
import { API_URL_FILE_MAP_CONTENTS, API_URL_PLACES_ID } from '@/constants/api-url'
import { type OpeningHoursDay, type PlaceEntity, type EditPlaceDto } from '@/interfaces/Place'

export default {
    computed: {
        ...mapState(usePlaceStore, ['placeCategories', 'placeDetailObject']),
        ...mapState(useModalStore, ['openingHoursDay']),

        placeId (): string {
            return this.$route.params.placeId as string
        }
    },

    methods: {
        ...mapActions(usePlaceStore, ['getPlaceCategories', 'getPlaceDetail', 'getMyPlaces']),
        ...mapActions(useModalStore, ['setOpenHoursDayData']),

        async getMyPlaceDetail () {
            await this.getPlaceDetail(this.placeId as string)
            if (this.placeDetailObject === undefined) return
            const placeData = this.placeDetailObject[this.placeId] as PlaceEntity
            this.form.data = {
                name: placeData.name,
                description: placeData.description,
                categoryId: placeData.categoryId,
                address: placeData.address,
                latitude: placeData.latitude,
                longitude: placeData.longitude,
                mapImageIds: placeData.mapImageIds,
                mapImageCoverId: placeData.mapImageCoverId,
                openingHours: placeData.openingHours,
                website: placeData.website ?? '',
                phone: placeData.phone ?? '',
                price: placeData.price,
                hashtags: placeData.hashtags ?? []
            } satisfies EditPlaceDto
            this.mapImages = placeData.mapImages as unknown as File[]
            this.form.gettingData = false;
            (this.$refs.textareaHahstag as HTMLTextAreaElement).value = placeData.hashtags.map(tag => `#${tag}`).join(' ') ?? ''
        },

        uploadImagePlace (event: Event) {
            const files = (event.target as HTMLInputElement).files
            if (files === null) return

            for (const file of files) {
                const formData = new FormData()
                formData.append('file', file)
                axios.post(API_URL_FILE_MAP_CONTENTS, formData).then((response: AxiosResponse) => {
                    const fileData = response.data.data as File
                    this.mapImages.push(fileData)
                    this.form.data.mapImageIds.push(fileData.id)
                    if (this.form.data.mapImageIds.length === 1) {
                        this.form.data.mapImageCoverId = fileData.id
                    }
                }).catch((error) => {
                    console.error(error)
                })
            }
        },

        async updatePlace () {
            this.form.loading = true
            try {
                const url = API_URL_PLACES_ID.replace(':placeId', this.placeId as string)
                if (this.form.data.website === '') delete this.form.data.website
                await axios.put(url, this.form.data)
                await this.getMyPlaces()
                if (window.Android !== undefined) {
                    window.Android.showToast('Perubahan berhasil disimpan')
                } else {
                    alert('Perubahan berhasil disimpan')
                }
                this.$router.push({ name: 'contribution' })
            } catch (error) {
                if (isAxiosError(error)) {
                    const message = error.response?.data.message as string
                    alert(message)
                }
                console.log(error)
            }
            this.form.loading = false
        },

        updateMarkerLocation (coordinates: Coordinates) {
            this.form.data.latitude = coordinates.latitude
            this.form.data.longitude = coordinates.longitude
        },

        openModalOpeningHours (dayIndex: number) {
            const data = this.form.data.openingHours[dayIndex] as OpeningHoursDay
            this.setOpenHoursDayData(data)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const modal = new bootstrap.Modal(document.getElementById('modal_opening_hours_day'))
            modal.show()
        },

        setNewOpeningHoursDay (dayIndex: number) {
            this.form.data.openingHours[dayIndex] = { ...this.openingHoursDay }
            console.log(this.form.data.openingHours)
        },

        unusedPlaceImage (fileId: string) {
            this.form.data.mapImageIds = this.form.data.mapImageIds.filter((id) => id !== fileId)
            this.mapImages = this.mapImages.filter((file) => file.id !== fileId)
        },

        parsingHastagString () {
            const textareaElement = this.$refs.textareaHahstag as HTMLTextAreaElement
            const hashtagString = textareaElement.value
            const hashtags = hashtagString.match(/#[a-zA-Z0-9_]+/g) ?? []
            const cleanHashtags = hashtags.map(tag => tag.slice(1))
            const cleanDuplicates = new Set(cleanHashtags)
            this.form.data.hashtags = [...cleanDuplicates]
        }
    },

    beforeMount () {
        this.getPlaceCategories()
        this.getMyPlaceDetail()
    },

    data () {
        return {
            form: {
                data: {
                    name: '',
                    description: '',
                    categoryId: '',
                    address: '',
                    latitude: 0,
                    longitude: 0,
                    mapImageIds: [],
                    mapImageCoverId: '',
                    openingHours: [
                        {
                            dayIndex: 0,
                            closed: true,
                            fullOpeningHours: false,
                            openingHours: '00:00',
                            closingHours: '00:00'
                        },
                        {
                            dayIndex: 1,
                            closed: true,
                            fullOpeningHours: false,
                            openingHours: '00:00',
                            closingHours: '00:00'
                        },
                        {
                            dayIndex: 2,
                            closed: true,
                            fullOpeningHours: false,
                            openingHours: '00:00',
                            closingHours: '00:00'
                        },
                        {
                            dayIndex: 3,
                            closed: true,
                            fullOpeningHours: false,
                            openingHours: '00:00',
                            closingHours: '00:00'
                        },
                        {
                            dayIndex: 4,
                            closed: true,
                            fullOpeningHours: false,
                            openingHours: '00:00',
                            closingHours: '00:00'
                        },
                        {
                            dayIndex: 5,
                            closed: true,
                            fullOpeningHours: false,
                            openingHours: '00:00',
                            closingHours: '00:00'
                        },
                        {
                            dayIndex: 6,
                            closed: true,
                            fullOpeningHours: false,
                            openingHours: '00:00',
                            closingHours: '00:00'
                        }
                    ],
                    website: '',
                    phone: '',
                    price: '',
                    hashtags: []
                } as unknown as EditPlaceDto,
                loading: false,
                gettingData: true
            },
            mapImages: [] as File[]
        }
    }
}
</script>

<style scoped lang="scss">
.image-scrollable-x {
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
    .image-item {
        position: relative;
        display: inline-block;
        width: 140px;
        height: 100px;
        border: 4px solid #fff;
        border-radius: 0.7rem !important;
        overflow: hidden;
        .close-button {
            position: absolute;
            right: 8px;
            top: 2px;
            color: gray;
            font-size: 18px;
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .map-image-cover {
        border-color: var(--x-blue-500);
    }
}
</style>
