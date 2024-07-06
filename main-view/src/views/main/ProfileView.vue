<script setup lang="ts">
import axios from '@/helpers/axios.helper'
import { API_URL_LOGOUT } from '@/constants/api-url'
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user.store'
import { UserRoleEnum } from '@/interfaces/enums'
</script>

<template>
    <HeaderNavbar nav-title="Profile Saya" :nav-back-to="{name: 'explore'}" />

    <!-- profile card -->
    <section class="container-fluid pt-4 mb-3">
        <div class="card border-0">
            <div class="card-body">
                <div class="d-flex justify-content-center">
                    <div class="avatar avatar-xl rounded-circle">
                        <img alt="..." :src="myInfo.avatar">
                    </div>
                </div>
                <div class="text-center my-3">
                    <span class="d-block h5 mb-0">{{ myInfo.name || '-' }}</span>
                    <span class="d-block text-sm text-muted mb-1">{{ myInfo.email || '-' }}</span>
                    <span v-if="myInfo.role === UserRoleEnum.ADMIN" class="badge bg-white text-dark border border">Administrator</span>
                </div>
            </div>
        </div>
    </section>

    <!-- navigation list -->
    <section class="mb-5">
        <div class="list-group list-group-flush border-top border-bottom">

            <div class="list-group-item position-relative hstack bg-light py-2">
                <span class="px-3">Akun</span>
            </div>

            <div class="list-group-item position-relative hstack flex-wrap waves-effect waves-dark">
                <div class="flex-1 px-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <RouterLink :to="{name: 'change-avatar'}" class="d-block h4 stretched-link">
                            <span>Ubah Foto</span>
                        </RouterLink>
                        <div class="icon text-end">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-group-item position-relative hstack flex-wrap waves-effect waves-dark">
                <div class="flex-1 px-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <RouterLink :to="{name: 'change-name'}" class="d-block h4 stretched-link">
                            <span>Ubah Nama</span>
                        </RouterLink>
                        <div class="icon text-end">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-group-item position-relative hstack flex-wrap waves-effect waves-dark">
                <div class="flex-1 px-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <a href="javascript:void(0)" class="d-block h4 stretched-link">
                            <span>Ulasan Saya</span>
                        </a>
                        <div class="icon text-end">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="list-group-item position-relative hstack bg-light py-2">
                <span class="px-3">Bantuan</span>
            </div>

            <div class="list-group-item position-relative hstack flex-wrap waves-effect waves-dark">
                <div class="flex-1 px-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <RouterLink :to="{name: 'information'}" class="d-block h4 stretched-link">
                            <span>Informasi</span>
                        </RouterLink>
                        <div class="icon text-end">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-group-item position-relative hstack flex-wrap waves-effect waves-dark">
                <div class="flex-1 px-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <RouterLink :to="{name: 'about'}" class="d-block h4 stretched-link">
                            <span>Tentang Aplikasi</span>
                        </RouterLink>
                        <div class="icon text-end">
                            <i class="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- logout -->
    <section class="container-fluid mb-5">
        <div class="d-grid">
            <button @click="logout" type="button" class="btn btn-outline-danger waves-effect waves-dark">
                Logout
            </button>
        </div>
    </section>
</template>

<script lang="ts">
export default {

    computed: {
        ...mapState(useUserStore, ['myInfo'])
    },

    methods: {
        async logout () {
            try {
                await axios.delete(API_URL_LOGOUT)
                localStorage.removeItem('access_token')
                this.$router.push({ name: 'auth' })
            } catch (error) {
                alert('Gagal keluar aplikasi.')
            }
        }
    }
}
</script>

<style scoped lang="scss">
.avatar {
    overflow: hidden;
}
</style>
