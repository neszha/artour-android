<template>
    <!-- header -->
    <section class="home-header mb-4 border-bottom">
        <nav class="navbar navbar-light px-0 py-1">
            <div class="container-xl">
                <RouterLink :to="{name: 'explore'}" class="navbar-brand">
                    <img src="/logo/box_logo.png" class="h-8 me-2" alt="...">
                </RouterLink>
                <div class="text-center">
                    <h2 class="font-bold h3">
                        Admin Dashboard
                    </h2>
                </div>
                <RouterLink :to="{name: 'profile', query: { routeBack: 'explore' }}" class="navbar-toggler text-dark" type="button">
                    <div class="avatar avatar-sm rounded-circle">
                        <img :src="myInfo.avatar" alt="...">
                    </div>
                </RouterLink>
            </div>
        </nav>
    </section>

    <!-- overview data -->
    <section class="">
        <div class="container-fluid">
            <div class="row">
                <div class="col-4 pe-1">
                    <div class="card mb-4">
                        <div class="card-body px-1">
                            <div class="text-center">
                                <div class="h1 font-bold mb-2">
                                    <span>100</span>
                                </div>
                                <div class="h6 font-semibold text-muted text-sm">
                                    <span>Pengguna</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 px-1">
                    <div class="card mb-4">
                        <div class="card-body px-1">
                            <div class="text-center">
                                <div class="h1 font-bold mb-2">
                                    <span>22</span>
                                </div>
                                <div class="h6 font-semibold text-muted text-sm">
                                    <span>Wisata</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 ps-1">
                    <div class="card mb-4">
                        <div class="card-body px-1">
                            <div class="text-center">
                                <div class="h1 font-bold mb-2">
                                    <span>10K</span>
                                </div>
                                <div class="h6 font-semibold text-muted text-sm">
                                    <span>Ulasan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- nav list -->
    <section>
        <div class="container-fluid mb-3">
            <h1 class="font-bold h3" style="font-weight: bold;">
                Kelola Data
            </h1>
        </div>
        <div class="container-fluid">
            <div class="card mb-4">
                <div class="card-body py-0">
                    <div class="list-group list-group-flush">
                        <div class="list-group-item d-flex align-items-center">
                            <div class="flex-fill">
                                <span class="d-block h6 font-semibold">
                                    Kategori Wisata
                                </span>
                                <div class="d-flex mx-n1"></div>
                            </div>
                            <div class="ms-auto text-end">
                                <i class="bi bi-chevron-right text-dark" style="font-size: 22px;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-4">
                <div class="card-body py-0">
                    <div class="list-group list-group-flush">
                        <div class="list-group-item d-flex align-items-center">
                            <div class="flex-fill">
                                <span class="d-block h6 font-semibold">
                                    Data Pengguna
                                </span>
                                <div class="d-flex mx-n1"></div>
                            </div>
                            <div class="ms-auto text-end">
                                <i class="bi bi-chevron-right text-dark" style="font-size: 22px;"></i>
                            </div>
                        </div>
                        <div class="list-group-item d-flex align-items-center">
                            <div class="flex-fill">
                                <span class="d-block h6 font-semibold">
                                    Data Tempat Wisata
                                </span>
                                <div class="d-flex mx-n1"></div>
                            </div>
                            <div class="ms-auto text-end">
                                <i class="bi bi-chevron-right text-dark" style="font-size: 22px;"></i>
                            </div>
                        </div>
                        <div class="list-group-item d-flex align-items-center">
                            <div class="flex-fill">
                                <span class="d-block h6 font-semibold">
                                    Data Ulasan
                                </span>
                                <div class="d-flex mx-n1"></div>
                            </div>
                            <div class="ms-auto text-end">
                                <i class="bi bi-chevron-right text-dark" style="font-size: 22px;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body py-0">
                    <div class="list-group list-group-flush">
                        <div
                            @click="$router.push({name: 'profile', query: {'routeBack': 'explore'}})"
                            class="list-group-item d-flex align-items-center">
                            <div class="flex-fill">
                                <span class="d-block h6 font-semibold">
                                    Kembali ke Profile
                                </span>
                                <div class="d-flex mx-n1"></div>
                            </div>
                            <div class="ms-auto text-end">
                                <i class="bi bi-chevron-left text-dark" style="font-size: 22px;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user.store'

export default {
    computed: {
        ...mapState(useUserStore, ['myInfo'])
    }

}
</script>

<style scoped lang="scss">
    .navbar {
        .navbar-brand {
            img {
                height: 33px;
            }
        }

        .navbar-toggler {
            font-size: 22px;
            box-shadow: none;

            &:focus {
                color: #6B7B93;
            }
        }
    }
</style>
