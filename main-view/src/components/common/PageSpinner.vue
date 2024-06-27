<template>
    <div ref="pageSpinner" v-if="show" class="page-spinner">
        <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        show: Boolean
    },

    mounted () {
        const height = window.innerHeight
        const pageSpinner = this.$refs.pageSpinner as HTMLElement
        if (pageSpinner !== undefined) {
            pageSpinner.style.height = `${height}px`
        }
    }
}
</script>

<style>
.page-spinner {
    width: 100%;
    height: 100vh;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
