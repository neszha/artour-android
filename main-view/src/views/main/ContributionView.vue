<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import CardPlace from '@components/card/CardPlace.vue'
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
                            Kontribusi
                        </h2>
                    </div>
                    <button @click="toAddPlaceView" class="navbar-toggler waves-effect waves-dark border border-secondary" type="button">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </nav>
        </section>

        <!-- welcome -->
        <section class="pb-4">
            <div class="container-fluid">
                <h5 class="mb-2">Halo, Fanesa Hadi Pramana</h5>
                <p class="text-sm lh-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo culpa aperiam natus dolor reprehenderit eos dolorem!
                </p>
            </div>
        </section>

        <!-- my placce list  -->
        <section class="mb-4">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col">
                        <h1 class="font-bold h3" style="font-weight: bold;">
                            Kelola Tempat
                        </h1>
                        <p class="text-sm text-muted mt-1">
                            Daftar Tempat Wisata yang Saya Kelola
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
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<script lang="ts">
export default {

    methods: {
        toAddPlaceView () {
            this.$router.push({ name: 'add-place' })
        }
    }
}
</script>

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
.vertical-infinite-scroll {
    display: flex;
    justify-content: center;

    .card {
        width: 100%;
    }
}
</style>
