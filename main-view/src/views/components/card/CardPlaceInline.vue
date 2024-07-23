<template>
    <div class="card">
        <div class="card-box-img">
            <img src="http://192.168.100.92:8000/map-contents/map-content-e79833aa-4872-454d-804d-a263793cc847-1721237053543.jpg"
                alt="..." class="card-img">
        </div>
        <div class="card-body p-2">
            <div class="head d-flex justify-content-between align-items-center">
                <h3 class="title h4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, animi.
                    Lorem, ipsum dolor.
                </h3>
                <div class="save-action">
                    <i class="bi bi-bookmark mx-2"></i>
                </div>
            </div>
            <div class="list-info">
                <div class="d-flex align-items-center">
                    <i class="bi bi-geo-alt-fill me-2 text-muted"></i>
                    <span class="address text-sm text-heading text-primary-hover">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, aut.
                    </span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-alarm-fill me-2 text-muted"></i>
                    <div class="text-sm text-heading text-primary-hover">
                        <span class="text-danger">Tutup</span>
                    </div>
                </div>
            </div>
            <div class="rating d-flex gap-1">
                <i class="bi-star-fill bi text-warning"></i>
                <i class="bi-star-fill bi text-warning"></i>
                <i class="bi-star-fill bi text-warning"></i>
                <i class="bi-star-fill bi text-warning"></i>
                <i class="bi-star-half bi text-warning"></i>
                <span>(4.90)</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .card {
        display: flex !important;
        flex-direction: row !important;
        width: 340px;

        .card-box-img {
            width: 90px;
            height: 100px;
            overflow: hidden;
            flex-shrink: 0;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .card-body {
            overflow: hidden;

            .title {
                font-size: 14px;
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                text-wrap: nowrap;
            }
        }

        .list-info {
            font-size: 12px;

            .address {
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        .rating {
            font-size: 12px;
        }
    }
</style>
