<script setup>
import MainLayout from '../layouts/MainLayout.vue'
import CardPlace from '@components/card/CardPlace.vue'
import CardPlaceCategory from '@components/card/CardPlaceCategory.vue'
</script>

<template>
    <MainLayout>
        <!-- header  -->
        <section class="home-header mb-3">
            <nav class="navbar navbar-light px-0 py-1">
                <div class="container-xl">
                    <a class="navbar-brand" href="#">
                        <img src="/logo/box_logo.png" class="h-8 me-2" alt="...">
                    </a>
                    <div class="text-center">
                        <h2 class="font-bold h3" style="font-style: bold !important;">
                            Explore
                        </h2>
                    </div>
                    <button class="navbar-toggler" type="button">
                        <i class="bi bi-bookmark"></i>
                    </button>
                </div>
            </nav>
        </section>

        <!-- search  -->
        <section class="pb-4">
            <div class="container-fluid">
                <form class="w-full w-lg-96">
                    <div class="input-group input-group-md input-group-inline shadow-none">
                        <span class="input-group-text pe-2 rounded-start-pill">
                            <i class="bi bi-geo-alt"></i>
                        </span>
                        <input type="text"
                            class="form-control text-md shadow-none rounded-end-pill"
                            placeholder="Apa yang sedang anda cari?" aria-label="Search">
                    </div>
                </form>
            </div>
        </section>

        <!-- highlight  -->
        <section class="mb-4">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col">
                        <h1 class="font-bold h3" style="font-weight: bold;">
                            Highlight
                        </h1>
                        <p class="text-sm text-muted mt-1">
                            Rekomendasi Tempat Wisata untuk Anda
                        </p>
                    </div>
                </div>
            </div>
            <div class="horizontal-scroll">
                <div class="hs-item px-3">
                    <CardPlace />
                    <CardPlace />
                    <CardPlace />
                    <CardPlace />
                    <CardPlace />
                    <CardPlace />
                    <CardPlace />
                    <CardPlace />
                </div>
            </div>
        </section>

        <!-- category  -->
        <section class="mb-4">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col">
                        <h1 class="font-bold h3" style="font-weight: bold;">
                            Kategori Wisata
                        </h1>
                        <p class="text-sm text-muted mt-1">
                            Explore Wisata Berdasarkan Kategori
                        </p>
                    </div>
                </div>
            </div>
            <div class="horizontal-scroll">
                <div class="hs-item px-3">
                    <CardPlaceCategory />
                    <CardPlaceCategory />
                    <CardPlaceCategory />
                    <CardPlaceCategory />
                    <CardPlaceCategory />
                    <CardPlaceCategory />
                    <CardPlaceCategory />
                    <CardPlaceCategory />
                </div>
            </div>
        </section>

        <!-- nearest tourist location  -->
        <section class="mb-4">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col">
                        <h1 class="font-bold h3" style="font-weight: bold;">
                            Wisata Terdekat
                        </h1>
                        <p class="text-sm text-muted mt-1">
                            Temukan Lokasi Wisata Terdekat dari Lokasi Anda
                        </p>
                    </div>
                </div>
            </div>
            <div class="vertical-infinite-scroll px-2">
                <div class="row w-100">
                    <div class="col-6 mb-3 px-2">
                        <CardPlace class="card-place-sm" />
                    </div>
                    <div class="col-6 mb-3 px-2">
                        <CardPlace class="card-place-sm" />
                    </div>
                    <div class="col-6 mb-3 px-2">
                        <CardPlace class="card-place-sm" />
                    </div>
                    <div class="col-6 mb-3 px-2">
                        <CardPlace class="card-place-sm" />
                    </div>
                    <div class="col-6 mb-3 px-2">
                        <CardPlace class="card-place-sm" />
                    </div>
                    <div class="col-6 mb-3 px-2">
                        <CardPlace class="card-place-sm" />
                    </div>
                    <div class="col-6 mb-3 px-2">
                        <CardPlace class="card-place-sm" />
                    </div>
                    <div class="col-6 mb-3 px-2">
                        <CardPlace class="card-place-sm" />
                    </div>
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<style scoped lang="scss">
.navbar {
    .navbar-toggler {
        font-size: 22px;
        box-shadow: none;
        &:focus {
            color: #6B7B93;
        }
    }
}
.navbar-brand {
    img {
        height: 33px;
    }
}
.horizontal-scroll {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;

    .hs-item {
        display: flex;
        gap: 12px;
    }
}
.vertical-infinite-scroll {
    display: flex;
    justify-content: center;

    .card {
        width: 100%;
    }
}
</style>
