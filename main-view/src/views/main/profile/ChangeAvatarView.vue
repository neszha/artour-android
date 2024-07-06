<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Ubah Foto" :nav-back-to="{name: 'profile'}" />

    <!-- avatar view -->
    <section class="container-fluid pt-4 mb-3">
        <div class="card border-0">
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <div class="avatar avatar-xl rounded-circle">
                        <img ref="avatarPreview" alt="...">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- form input  -->
    <section class="container-fluid">
        <div class="card">
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-center mb-2">
                    <input ref="fileInput" @change="uploadAvatar" type="file" class="d-none" accept="image/*">
                    <button @click="($refs.fileInput as HTMLImageElement).click()" :disabled="loading" type="button" class="btn btn-sm btn-neutral waves-effect waves-dark">
                        <span v-if="loading">Memperbaharui...</span>
                        <span v-else>Upload Foto</span>
                    </button>
                </div>
                <p class="text-sm text-muted text-center mb-0">
                    Upload file <code>png/jpg/jpeg</code> max 1MB dengan rasio 1:1
                </p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { isAxiosError } from 'axios'
import { mapActions, mapState } from 'pinia'
import axios from '@/helpers/axios.helper'
import { useUserStore } from '@/stores/user.store'
import { API_URL_USER_AVATAR } from '@/constants/api-url'

export default {
    computed: {
        ...mapState(useUserStore, ['myInfo'])
    },

    methods: {
        ...mapActions(useUserStore, ['getMySessionInfo']),

        async uploadAvatar (event: Event) {
            const file = (event.target as HTMLInputElement).files?.[0]
            if (file === undefined) return

            // Upload to server.
            try {
                this.loading = true
                const formData = new FormData()
                formData.append('file', file)
                await axios.post(API_URL_USER_AVATAR, formData)
                if (window.Android !== undefined) {
                    window.Android.showToast('Foto berhasil di perbahauri')
                }
            } catch (error) {
                this.loading = false
                if (isAxiosError(error)) {
                    const errorMessage = error.response?.data.message as string
                    if (window.Android !== undefined) {
                        window.Android.showToast(errorMessage)
                        return
                    }
                    alert(errorMessage)
                }
                return
            }

            // Update new preview.
            await this.getMySessionInfo();
            (this.$refs.avatarPreview as HTMLImageElement).src = this.myInfo.avatar
            this.loading = false
        }
    },

    mounted () {
        (this.$refs.avatarPreview as HTMLImageElement).src = this.myInfo.avatar
    },

    data () {
        return {
            loading: false
        }
    }
}
</script>

<style scoped lang="scss">
.avatar {
    overflow: hidden;
}
</style>
