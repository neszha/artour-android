<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Ubah Nama" />

    <!-- form input  -->
    <section class="container-fluid mt-4">
        <form @submit.prevent="updateName">
            <div class="mb-3">
                <label class="form-label">Nama</label>
                <input v-model="form.data.name" type="text" class="form-control" placeholder="Nama">
            </div>
            <div class="d-flex justify-content-end">
                <button :disabled="form.loading" type="submit" class="btn btn-primary waves-effect waves-light">
                    <span v-if="form.loading">Menyimpan...</span>
                    <span v-else>Simpan</span>
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { isAxiosError } from 'axios'
import { mapActions, mapState } from 'pinia'
import axios from '@/helpers/axios.helper'
import { useUserStore } from '@/stores/user.store'
import { API_URL_USER_INFO } from '@/constants/api-url'

export default {
    computed: {
        ...mapState(useUserStore, ['myInfo'])
    },

    methods: {
        ...mapActions(useUserStore, ['getMySessionInfo']),

        async updateName () {
            try {
                this.form.loading = true
                await axios.patch(API_URL_USER_INFO, this.form.data)
                if (window.Android !== undefined) {
                    window.Android.showToast('Nama pengguna berhasil di perbahauri')
                }
                await this.getMySessionInfo()
            } catch (error) {
                this.form.loading = false
                if (isAxiosError(error)) {
                    const errorMessage = error.response?.data.message as string
                    if (window.Android !== undefined) {
                        window.Android.showToast(errorMessage)
                    } else {
                        alert(errorMessage)
                    }
                }
            }
            this.form.loading = false
        }
    },

    beforeMount () {
        this.form.data.name = this.myInfo.name
    },

    data () {
        return {
            form: {
                data: {
                    name: ''
                },
                loading: false
            }
        }
    }
}
</script>
