<script setup lang="ts">
import CardPlaceReview from '@/components/card/CardPlaceReview.vue'
</script>

<template>
    <!-- header  -->
    <section class="home-header mb-3">
        <nav class="navbar navbar-light px-0 py-1">
            <div class="container-xl pt-2">
                <button @click="closeView" class="navbar-toggler text-dark" type="button">
                    <i class="bi bi-x-lg"></i>
                </button>
                <div class="d-flex gap-2">
                    <button class="navbar-toggler text-dark" type="button">
                        <i class="bi bi-geo-alt"></i>
                    </button>
                    <button class="navbar-toggler text-dark" type="button">
                        <i class="bi bi-share-fill"></i>
                    </button>
                </div>
            </div>
        </nav>
    </section>

    <!-- place title -->
    <section class="mb-3">
        <div class="container-fluid">
            <h6 class="mb-1">Pasar Malam Bandar Lampung</h6>
            <div class="rating d-flex gap-1">
                <span>3.4</span>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-half text-warning"></i>
                <i class="bi bi-star text-warning"></i>
                <i class="bi bi-star text-warning"></i>
                <span>(200)</span>
            </div>
            <small>Jarak 20 KM</small>
        </div>
    </section>

    <!-- place image galery -->
    <section class="place-imae-galery mb-3">
        <div class="horizontal-scroll px-2 mx-1">
            <div v-for="i in 5" :key="i" class="hs-item d-flex gap-2">
                <div class="single-img">
                    <div class="box-img" data-v-bdb02ee3="">
                        <img src="@assets/dummy-images/place-img-01.jpg" alt="..." class="card-img" >
                    </div>
                </div>
                <div class="double-img d-flex flex-column gap-2">
                    <div class="box-img" data-v-bdb02ee3="">
                        <img src="@assets/dummy-images/place-img-02.jpg" alt="..." class="card-img" >
                    </div>
                    <div class="box-img" data-v-bdb02ee3="">
                        <img src="@assets/dummy-images/place-img-03.jpg" alt="..." class="card-img" >
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- action buttons -->
    <section class="action-button mb-2 pt-1">
        <div class="action-item d-flex gap-2 mb-2">
            <button class="btn btn-primary border-base waves-effect waves-light">
                <i class="bi bi-sign-turn-right-fill me-2"></i>
                <span>Buka Rute</span>
            </button>
            <button class="btn btn-neutral border-primary text-primary waves-effect waves-dark">
                <i class="bi bi-hand-thumbs-up-fill me-2"></i>
                <span>Like (20K)</span>
            </button>
            <button class="btn btn-neutral border-dark waves-effect waves-dark">
                <i class="bi bi-hand-thumbs-down me-2"></i>
                <span>Dislike (92)</span>
            </button>
            <button class="btn btn-neutral border-primary text-primary waves-effect waves-dark">
                <i class="bi bi-bookmark-plus-fill me-2"></i>
                <span>Simpan (2)</span>
            </button>
            <button class="btn btn-neutral border-dark waves-effect waves-dark">
                <i class="bi bi-share-fill me-2"></i>
                <span>Bagikan</span>
            </button>
        </div>
    </section>

    <!-- place description -->
    <section class="mb-4">
        <div class="container-fluid">
            <div class="views">
                <small>1.2K Pengunjung</small>
            </div>
            <p class="description mb-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit suscipit labore dolor laborum a. Totam.
            </p>
            <div class="d-flex align-items-center mb-2">
                <i class="bi bi-geo-alt me-2 text-primary"></i>
                <span class="text-sm text-heading">San Francisco, California</span>
            </div>
            <div class="d-flex align-items-center mb-2">
                <i class="bi bi-currency-dollar me-2 text-primary"></i>
                <span class="text-sm text-heading">Rp 500.000,00</span>
            </div>
            <div class="d-flex align-items-center mb-2">
                <i class="bi bi-alarm me-2 text-primary"></i>
                <span class="text-sm text-heading">00.00 - 00.00 (Buka)</span>
            </div>
            <div class="d-flex align-items-center mb-2">
                <i class="bi bi-globe me-2 text-primary"></i>
                <a href="#" class="text-sm text-heading text-primary-hover">https://mywebsite.com</a>
            </div>
        </div>
    </section>

    <!-- review list -->
    <section class="place-review mb-3">
        <div class="place-review-header container-fluid mb-3">
            <h5 class="mb-0">Ulasan Pengunjung</h5>
        </div>
        <div class="place-review-list">
            <CardPlaceReview />
            <CardPlaceReview />
            <CardPlaceReview />
            <CardPlaceReview />
            <CardPlaceReview />
            <CardPlaceReview />
        </div>
    </section>

</template>

<script lang="ts">
export default {
    methods: {
        closeView () {
            this.$router.push({ name: 'explore' })
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
.place-imae-galery {
    overflow-x: scroll;
    scroll-behavior: smooth;
    .horizontal-scroll {
        display: flex;
        gap: 0.5rem;
        .hs-item:last-child {
            padding-right: 1rem;
        }
    }
    .box-img {
        overflow: hidden;
        border-radius: 8px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .single-img {
        .box-img {
            width: 250px;
            height: 368px;
        }
    }
    .double-img {
        .box-img {
            width: 180px;
            aspect-ratio: 1/1;
        }
    }
}
.action-button {
    overflow-x: scroll;
    scroll-behavior: smooth;
    .action-item {
        width: 800px;
        padding: 0 1rem;
    }
}
</style>
