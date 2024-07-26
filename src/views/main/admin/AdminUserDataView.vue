<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Data Pengguna" />

    <!-- filter  -->
    <section class="container-fluid mt-4 mb-4">
        <div class="d-flex flex-column flex-md-row gap-3 justify-content-between">
            <div class="d-flex gap-3">
                <div class="input-group input-group-sm input-group-inline">
                    <span class="input-group-text pe-2">
                        <i class="bi bi-search"></i>
                    </span>
                    <input
                        v-model="filter.keyword"
                        type="text"
                        class="form-control"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </div>
            </div>
        </div>
    </section>

    <!-- data list  -->
    <section class="container-fluid mb-5">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="me-auto">Daftar Akun Pengguna</h5>
            </div>
            <div class="table-responsive">
                <table class="table table-hover table-nowrap">
                    <thead class="table-light">
                        <tr>
                            <th style="width: 0;"></th>
                            <th scope="col">Nama</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Kontribusi</th>
                            <th scope="col">Terakhir Login</th>
                            <th scope="col">Terdaftar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredUsers.length === 0">
                            <td class="text-center" colspan="7">
                                <span>Tidak ada data!</span>
                            </td>
                        </tr>
                        <tr v-for="user of filteredUsers" :key="user.id">
                            <td :data-id="user.id">
                                <button type="button" class="btn btn-sm btn-square btn-neutral waves-effect waves-dark">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                            <td>
                                <img
                                    v-lazy="user.avatar"
                                    alt="..." class="avatar avatar-sm rounded-circle me-2">
                                <span class="text-heading font-semibold">
                                    {{ user.name }}
                                </span>
                            </td>
                            <td>
                                <span class="text-heading">
                                    {{ user.email }}
                                </span>
                            </td>
                            <td>
                                <span v-if="user.role === UserRoleEnum.ADMIN" class="badge text-white bg-danger text-primary rounded-pill">
                                    Admin
                                </span>
                                <span v-if="user.role === UserRoleEnum.USER" class="badge text-white bg-info text-primary rounded-pill">
                                    User
                                </span>
                            </td>
                            <td>
                                <span>
                                    {{ user.contributionSummary?.placeTotal }} Wisata | {{ user.contributionSummary?.reviewTotal }} Ulasan
                                </span>
                            </td>
                            <td>
                                <span v-if="user.lastLoginAt">
                                    {{ getTimeString(user.lastLoginAt) }}
                                </span>
                                <span v-else>-</span>
                            </td>
                            <td>
                                {{ getTimeString(user.createdAt) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer border-0 py-3">
                <span class="text-muted text-sm">Menampilkan {{ filteredUsers.length }} dari {{ users.length }} total data</span>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import moment from 'moment'
import { mapActions, mapState } from 'pinia'
import { UserRoleEnum } from '@/interfaces/enums'
import { type UserEntity } from '@/interfaces/User'
import { useAdminStore } from '@/stores/admin.store'

export default {
    computed: {
        ...mapState(useAdminStore, ['users']),

        filteredUsers (): UserEntity[] {
            let users = this.users as UserEntity[]

            // Filter by keyword.
            const lowerKeyword = this.filter.keyword.toLowerCase() as string
            users = users.filter((user: UserEntity) => {
                const matchName = user.name.toLowerCase().includes(lowerKeyword)
                const matchEmail = user.email.toLowerCase().includes(lowerKeyword)
                return matchName || matchEmail
            })

            // done.
            return users
        }
    },

    methods: {
        ...mapActions(useAdminStore, ['getUsers']),

        getTimeString (time: Date): string {
            return moment(time).fromNow()
        }
    },

    beforeMount () {
        this.getUsers()
    },

    data () {
        return {
            filter: {
                keyword: '' as string
            }
        }
    }

}
</script>
