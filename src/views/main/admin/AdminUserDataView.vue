<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
import { TIME_MOMENT_FORMAT } from '@/constants/global-string'
import ModalDeleteUser from '@/views/components/modals/ModalDeleteUser.vue'
import ModalUpdateUserRole from '@/views/components/modals/ModalUpdateUserRole.vue'
</script>

<template>
    <HeaderNavbar nav-title="Data Pengguna" />

    <!-- filter  -->
    <section class="container-fluid mt-4 mb-4">
        <div class="d-flex flex-column flex-md-row gap-3 justify-content-between">
            <form
                @submit.prevent="filterUsersByKeyword()"
                class="d-flex gap-3">
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
            </form>
        </div>
    </section>

    <!-- data list  -->
    <section class="container-fluid mb-5">
        <div class="card">
            <div class="card-header d-flex align-items-center justify-content-between">
                <h5 class="me-auto">Akun Pengguna</h5>
                <div class="float-end">
                    <div class="dropdown">
                        <a class="dropdown-toggle text-reset" href="javascript:void(0)" id="dropdown_menu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="font-size: 14px;">
                            <span class="fw-semibold">Filter:</span> <span class="text-muted">{{ filter.filterValue }}<i class="mdi mdi-chevron-down ms-1"></i></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown_menu" style="">
                            <a
                                v-for="filter of filterList" :key="filter.key"
                                @click="filterUsers(filter.key)"
                                class="dropdown-item" href="javascript:void(0)">{{ filter.value }}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-hover table-nowrap">
                    <thead class="table-light">
                        <tr>
                            <th scope="col">Nama</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Kontribusi</th>
                            <th scope="col">Terakhir Login</th>
                            <th scope="col">Terdaftar</th>
                            <th scope="col">Terakhir Update</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredUsers.length === 0">
                            <td class="text-center" colspan="7">
                                <span>Tidak ada data!</span>
                            </td>
                        </tr>
                        <tr v-for="user of filteredUsers" :key="user.id">
                            <td>
                                <img
                                v-lazy="user.avatar"
                                alt="..." class="avatar avatar-sm rounded-circle me-2">
                                <span class="me-3">
                                    {{ user.name }}
                                </span>
                            </td>
                            <td>
                                <span class="text-heading">
                                    {{ user.email }}
                                </span>
                            </td>
                            <td>
                                <span v-if="user.userMeta?.isSuperAdmin" class="badge text-white bg-primary text-primary rounded-pill">
                                    Super Admin
                                </span>
                                <span v-else-if="user.role === UserRoleEnum.ADMIN" class="badge text-white bg-danger text-primary rounded-pill">
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
                                {{ moment(user.createdAt).format(TIME_MOMENT_FORMAT) }}
                            </td>
                            <td>
                                {{ moment(user.updatedAt).format(TIME_MOMENT_FORMAT) }}
                            </td>
                            <td class="text-center">
                                <div v-if="!user.userMeta?.isSuperAdmin && myInfo.userMeta?.isSuperAdmin">
                                    <button
                                        @click="openUpdateRoleModal(user.id, user.role)"
                                        type="button" class="btn btn-sm btn-square btn-neutral waves-effect waves-dark me-2">
                                        <i class="bi bi-pencil"></i>
                                    </button>
                                    <button
                                        @click="openDeleteModal(user.id)"
                                        type="button" class="btn btn-sm btn-square btn-outline-danger waves-effect waves-dark">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                                <div v-else>-</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer border-0 py-3">
                <span class="text-muted text-sm">Menampilkan {{ filteredUsers.length }} dari {{ usersSearchMeta.total }} total data</span>
            </div>
        </div>
    </section>

    <!-- modals  -->
    <ModalDeleteUser id="modal_delete_user" :user-id="modalData.userId" />
    <ModalUpdateUserRole id="modal_update_user_role" :user-id="modalData.userId" :user-role="modalData.role" />
</template>

<script lang="ts">
import moment from 'moment'
import { mapActions, mapState } from 'pinia'
import { UserRoleEnum } from '@/interfaces/enums'
import { type UserEntity } from '@/interfaces/User'
import { useAdminStore } from '@/stores/admin.store'
import { useUserStore } from '@/stores/user.store'

export default {
    computed: {
        ...mapState(useAdminStore, ['users', 'usersSearchMeta']),
        ...mapState(useUserStore, ['myInfo']),

        filteredUsers (): UserEntity[] {
            const users = this.users as UserEntity[]
            // done.
            return users
        }
    },

    methods: {
        ...mapActions(useAdminStore, ['getUsers']),

        getTimeString (time: Date): string {
            return moment(time).fromNow()
        },

        filterUsers (filterKey: string) {
            this.filter.filterKey = filterKey
            this.filter.filterValue = this.filterList.find(x => x.key === filterKey)?.value as string
            void this.getUsers(this.filter.filterKey as string, this.filter.keyword as string)
        },

        filterUsersByKeyword () {
            void this.getUsers(this.filter.filterKey as string, this.filter.keyword as string)
        },

        openDeleteModal (userId: string) {
            this.modalData.userId = userId
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const modal = new bootstrap.Modal(document.getElementById('modal_delete_user'))
            modal.show()
        },

        openUpdateRoleModal (userId: string, role: UserRoleEnum) {
            this.modalData.userId = userId
            this.modalData.role = role
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const modal = new bootstrap.Modal(document.getElementById('modal_update_user_role'))
            modal.show()
        }
    },

    beforeMount () {
        this.getUsers(this.filter.filterKey, null)
    },

    data () {
        return {
            filter: {
                keyword: '' as string,
                filterKey: 'newest',
                filterValue: 'Terbaru'
            },
            filterList: [
                { key: 'newest', value: 'Terbaru' },
                { key: 'role:user', value: 'Role: User' },
                { key: 'role:admin', value: 'Role: Admin' },
                { key: 'role:super_admin', value: 'Role: Super Admin' }
            ],
            modalData: {
                userId: '',
                role: ''
            }
        }
    }

}
</script>
