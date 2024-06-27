<template>
    <div class="card">
        <div class="card-box-img">
            <img src="@assets/dummy-images/place-img-01.jpg" alt="..." class="card-img">
            <div class="badge-absolute">
                <span class="badge bg-light text-dark border mb-2">
                    20 KM
                </span>
            </div>
        </div>
        <div class="card-body">
            <span class="badge bg-white text-dark border mb-2">
                Wisata Alam
            </span>
            <h3 class="title h4">
                Lorem ipsum dolor sit.
            </h3>
            <p class="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare pretium placerat ut
                platea.
            </p>
            <div class="list-info my-2">
                <div class="d-flex align-items-center">
                    <i class="bi bi-geo-alt-fill me-2 text-muted"></i>
                    <span class="text-sm text-heading text-primary-hover">
                        San Francisco, California
                    </span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-alarm-fill me-2 text-muted"></i>
                    <span class="text-sm text-heading text-primary-hover">
                        00.00 - 00.00 (Buka)
                    </span>
                </div>
            </div>
            <div class="rating d-flex gap-1">
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-fill text-warning"></i>
                <i class="bi bi-star-half text-warning"></i>
                <i class="bi bi-star text-warning"></i>
                <i class="bi bi-star text-warning"></i>
                <span>(2.5)</span>
            </div>
            <p class="price text-primary">
                Rp 500.000,00
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    width: 250px;
    overflow: hidden;
    .card-box-img {
        position: relative;
        .card-img {
            border-radius: 0;
        }
        .badge-absolute {
            position: absolute;
            top: 16px;
            right: 16px;
            z-index: 2;
        }
    }
    .card-body {
        padding: 16px;
        .title {
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .description {
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .list-info {
            font-size: 12px;
        }
        .rating {
            font-size: 16px;
        }
        .price {
            font-size: 14px;
        }
    }
}
</style>

<style lang="scss">
.card.card-place-sm {
    border-radius: calc(var(--x-card-border-radius) - 0.1rem);
    .card-box-img {
        .badge-absolute {
            top: 10px;
            right: 10px;
            .badge {
                font-size: 10px;
            }
        }
    }
    .card-body {
        padding: 12px;
        .badge {
            font-size: 10px;
        }
        .title {
            font-size: 14px;
        }
        .description {
            font-size: 12px;
            white-space: nowrap;
        }
        .list-info {
            font-size: 12px;
        }
        .rating {
            font-size: 14px;
        }
        .price {
            font-size: 14px;
        }
    }
}
</style>
