<template>
    <div class="card">
        <div class="card-box-img">
            <img src="@assets/dummy-images/place-img-02.jpg" alt="..." class="card-img">
        </div>
        <div class="card-body p-3">
            <h3 class="title h4 mb-2">
                Lorem ipsum
            </h3>
            <p class="description mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare pretium placerat ut
                platea.
            </p>
            <a href="javascript:void(0)" class="text-primary">
                <strong>EXPLORE</strong>
            </a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    width: 250px;
    overflow: hidden;
    .card-img {
        border-radius: 0;
    }
    .card-body {
        .title {
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .description {
            font-size: 14px;
            text-wrap: wrap;
        }
    }
}
</style>
