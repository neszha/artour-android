<template>
    <header class="pc-header border-bottom">
        <div class="header-wrapper">
            <div class="back-button d-flex align-items-center">
                <a @click="goBack" href="javascript:void(0);" class="text-dark fw-bold">
                    <i class="ti ti-arrow-left f-26"></i>
                </a>
            </div>
            <div class="title d-flex align-items-center justify-content-center">
                <h5 class="mb-0">{{ dataTitle || 'Header Title' }}</h5>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
export default {
    props: {
        dataTitle: String
    },

    methods: {
        goBack () {
            this.$emit('back-callback')
        }
    }
}
</script>

<style scoped lang="scss">
.pc-header {
    min-height: 60px;
    backdrop-filter: blur(0px);
    background-color: var(--bs-body-bg);
    top: 0;
    left: 0 !important;

    .header-wrapper {
        position: relative;
        padding: 0 15px !important;
    }
}
.back-button {
    position: relative;
    z-index: 21;
}
.title {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 60px;
    z-index: 20;
}
</style>
