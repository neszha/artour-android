<script setup lang="ts">
import HeaderNavbar from '@components/common/HeaderNavbar.vue'
</script>

<template>
    <HeaderNavbar nav-title="Tentang Aplikasi" :nav-back-to="{name: 'profile'}" />

    <!-- content  -->
    <section ref="about" class="about">
        <div class="title text-center mb-4">
            <h1 class="font-bold h4" style="font-weight: bold;">
                (Nama Aplikasi)
            </h1>
            <small class="text-muted mt-1">
                Version 0.1.0
            </small>
        </div>
        <div class="brand-logo d-flex justify-content-center align-items-center mb-3">
            <img src="/logo/box_logo.png" alt="img">
        </div>
        <small class="text-muted mt-1">
            @ 2024 oleh (Nama Pengembang)
        </small>
    </section>
</template>

<script lang="ts">
export default {
    mounted () {
        const height = window.innerHeight - 58
        const about = this.$refs.about as HTMLElement
        if (about !== undefined) {
            about.style.height = `${height}px`
        }
    }
}
</script>

<style scoped lang="scss">
.about {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 58px);
    justify-content: center;
    align-items: center;
}
.brand-logo {
    img {
        width: 100px;
    }
}
</style>
