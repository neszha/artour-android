<template>
    <div class="modal fade modal-animate anim-blur" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body pt-4">
                    <button ref="close" type="button" class="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="row">
                        <div class="col-12">
                            <span>
                                Akan menghapus semua data yang beralasi.
                                Yakin ingin mengapus tempat akun ini?
                            </span>
                        </div>
                    </div>
                    <div class="mt-4 d-flex justify-content-end">
                        <button @click="($refs.close as  HTMLElement).click()" type="button" class="btn btn-sm btn-link text-secondary">Batal</button>
                        <button @click="deleteUser()" type="button" class="btn btn-sm btn-link text-danger">Hapus Akun</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import { isAxiosError } from 'axios'
import axios from '@/helpers/axios.helper'
import { useAdminStore } from '@/stores/admin.store'
import { API_URL_USERS_ID } from '@/constants/api-url'

export default {

    methods: {
        ...mapActions(useAdminStore, ['getUsers']),

        async deleteUser () {
            try {
                const url = API_URL_USERS_ID.replace(':userId', this.userId as string)
                await axios.delete(url)
                await this.getUsers()
                if (window.Android !== undefined) {
                    window.Android.showToast('Akun pengguna berhasil dihapus!')
                } else {
                    alert('Akun pengguna berhasil dihapus!')
                }
            } catch (error) {
                if (isAxiosError(error)) {
                    const message = error.response?.data.message as string
                    alert(message)
                }
                console.error(error)
            }
            (this.$refs.close as HTMLElement).click()
        }
    },

    props: {
        userId: {
            type: String,
            required: true
        }
    }
}
</script>
