<template>
    <div class="main-layout position-relative">
        <div class="main-content">
            <slot></slot>
        </div>
        <div id="bottom-navbar" class="bottom-navigation-bar">
            <ul class="navigation-bar nav nav-tabs">
                <li class="nav-item">
                    <RouterLink :to="{name: 'explore'}" class="nav-link waves-effect waves-dark" href="javascript:void(0)">
                        <div class="box-icon">
                            <i class="bi-compass-fill"></i>
                        </div>
                        <span>Explore</span>
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{name: 'maps'}" class="nav-link waves-effect waves-dark" href="javascript:void(0)">
                        <div class="box-icon">
                            <i class="bi-geo-alt-fill"></i>
                        </div>
                        <span>Maps</span>
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <a class="nav-link waves-effect waves-dark" href="to-ar-cam.html">
                        <div class="box-icon">
                            <i class="bi-vignette"></i>
                        </div>
                        <span>AR Cam</span>
                    </a>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{name: 'contribution'}" class="nav-link waves-effect waves-dark" href="javascript:void(0)">
                        <div class="box-icon">
                            <i class="bi-plus-square-fill"></i>
                        </div>
                        <span>Kontribusi</span>
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink :to="{name: 'profile'}" class="nav-link waves-effect waves-dark">
                        <div class="box-icon">
                            <i class="bi-person-circle"></i>
                        </div>
                        <span>Profile</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { useGeolocationStore } from '@/stores/geolocation.store'
import { mapActions } from 'pinia'

export default {
    methods: {
        ...mapActions(useGeolocationStore, ['getCurrentGeolocation'])
    },

    mounted () {
        if (window.Android !== undefined) {
            window.Android.setupPermissions()
        }
        this.getCurrentGeolocation()
    }
}
</script>

<style scoped lang="scss">
.router-link-exact-active {
    color: var(--bs-primary) !important;
}
.main-layout {
    height: 100vh;
    min-height: 720px;

    .main-content {
        padding-bottom: 70px;
    }
}
.bottom-navigation-bar {
    position: fixed;
    z-index: 1000;
    background: #ffffff;
    width: 100%;
    margin: 0 auto;
    min-height: 60px;
    bottom: 0;
    border-top: 1px solid #e8e8e8;

    .navigation-bar {
        display: flex;
        justify-content: space-around;
        border: none;

        .nav-item {
            width: 20%;
            margin: 0;
            display: flex;
            justify-content: center;
            text-align: center;
            .box-icon {
                font-size: 16px;
            }
        }

        .nav-link {
            width: 100%;
            padding: 12px 0;
            font-size: 12px;
            &.active {
                color: var(--x-blue-600);
            }
        }
    }
}
</style>
