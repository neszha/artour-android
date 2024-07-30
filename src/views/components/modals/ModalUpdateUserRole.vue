<template>
    <div class="modal fade modal-animate anim-blur" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body pt-4">
                    <button ref="close" type="button" class="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    <h5 class="modal-title mb-3">Update User Role</h5>
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label class="form-label">
                                User Role
                            </label>
                            <select v-model="form.data.role" class="form-select" required>
                                <option value="">-- Pilih Role --</option>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-4 d-flex justify-content-end">
                        <button @click="($refs.close as  HTMLElement).click()" type="button" class="btn btn-sm btn-link text-secondary">Batal</button>
                        <button @click="updateUserRole()" type="button" class="btn btn-sm btn-link text-primary">Simpan</button>
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
import { API_URL_USER_ROLE } from '@/constants/api-url'

export default {

    methods: {
        ...mapActions(useAdminStore, ['getUsers']),

        async updateUserRole () {
            try {
                const url = `${API_URL_USER_ROLE}?userId=${this.userId}`
                await axios.patch(url, this.form.data)
                await this.getUsers()
                if (window.Android !== undefined) {
                    window.Android.showToast('Role user berhasil diperbaharui!')
                } else {
                    alert('Role user berhasil diperbaharui!')
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

    watch: {
        userRole: {
            handler () {
                this.form.data.role = this.userRole
            }
        }
    },

    data () {
        return {
            form: {
                data: {
                    role: ''
                },
                loading: false
            }
        }
    },

    props: {
        userId: {
            type: String,
            required: true
        },
        userRole: {
            type: String,
            required: true
        }
    }
}
</script>
