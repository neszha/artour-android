<template>
    <div class="card place-review-item py-4">
        <div class="container-fluid">
            <div class="d-flex align-items-center mb-3">
                <div class="me-2">
                    <div class="avatar avatar-md rounded-circle">
                        <img alt="..." src="https://clever.webpixels.io/img/people/img-1.jpg">
                    </div>
                </div>
                <div class="flex-fill">
                    <div class="d-block h6 font-semibold mb-1">Norman Mohrbacher</div>
                    <div class="d-flex align-items-center gap-1">
                        <div class="rating d-flex gap-1">
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star text-warning"></i>
                            <i class="bi bi-star text-warning"></i>
                        </div>
                        <small>sebulan yang lalu</small>
                    </div>
                </div>
            </div>
            <div class="review-description">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur animi, aspernatur facere quae beatae?</p>
                <p>Lorem ipsum dolor sit amet...</p>
                <a href="#" class="text-decoration-underline">Selengkapnya</a>
            </div>
        </div>
        <div class="image-review mt-3">
            <div v-if="imageCount === 1" class="d-flex gap-1">
                <div class="image-review-item w-100" style="height: auto;">
                    <img class="w-100" src="@assets/dummy-images/place-img-01.jpg" alt="...">
                </div>
            </div>
            <div v-if="imageCount === 2" class="d-flex gap-1">
                <div class="image-review-item">
                    <img class="w-100" src="@assets/dummy-images/place-img-01.jpg" alt="...">
                </div>
                <div class="image-review-item">
                    <img class="w-100" src="@assets/dummy-images/place-img-02.jpg" alt="...">
                </div>
            </div>
            <div v-if="imageCount === 3" class="d-flex gap-1">
                <div class="image-review-item">
                    <img class="w-100" src="@assets/dummy-images/place-img-01.jpg" alt="...">
                </div>
                <div class="image-review-col">
                    <div class="image-review-item">
                        <img class="w-100" src="@assets/dummy-images/place-img-02.jpg" alt="...">
                    </div>
                    <div class="image-review-item">
                        <img class="w-100" src="@assets/dummy-images/place-img-03.jpg" alt="...">
                    </div>
                </div>
            </div>
            <div v-if="imageCount === 4" class="d-flex gap-1">
                <div class="image-review-col">
                    <div class="image-review-item">
                        <img class="w-100" src="@assets/dummy-images/place-img-02.jpg" alt="...">
                    </div>
                    <div class="image-review-item">
                        <img class="w-100" src="@assets/dummy-images/place-img-03.jpg" alt="...">
                    </div>
                </div>
                <div class="image-review-col">
                    <div class="image-review-item">
                        <img class="w-100" src="@assets/dummy-images/place-img-02.jpg" alt="...">
                    </div>
                    <div class="image-review-item">
                        <img class="w-100" src="@assets/dummy-images/place-img-03.jpg" alt="...">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {

    methods: {
        randomInt (min: number, max: number) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
    },

    data () {
        return {
            imageCount: this.randomInt(1, 4)
        }
    }
}
</script>

<style scoped lang="scss">
.place-review-item {
    border-radius: 0px;
    border-left: 0px;
    border-right: 0px;
}
.review-description {
    display: inline-block;
}
.image-review {
    .image-review-item {
        overflow: hidden;
        width: 50%;
        height: 260px;
    }
    .image-review-col {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        width: 50%;
        .image-review-item {
            width: 100%;
            height: 128px;
        }
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
