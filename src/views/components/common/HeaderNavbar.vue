<template>
    <nav class="navbar navbar-light bg-white border-bottom px-0 py-1">
        <div class="container-xl">
            <div @click="backAction()" class="navbar-brand p-0">
                <i class="bi bi-arrow-left"></i>
            </div>
            <div class="title text-center">
                <h2 class="font-bold h3" style="font-style: bold !important;">
                    {{ navTitle }}
                </h2>
            </div>
            <div class="right-action">
                <slot class="" name="right-action"></slot>
            </div>
        </div>
    </nav>
    <div class="invisible" style="width: 100%; height: 60px;">...</div>
</template>

<script lang="ts">
import { type RouteLocationRaw } from 'vue-router'
export default {

    methods: {
        backAction () {
            const routeBack = this.$route.query.routeBack as string | undefined
            if (routeBack !== undefined) {
                this.$router.push({ name: routeBack })
                return
            }
            if (this.navBackTo !== undefined) {
                this.$router.push(this.navBackTo)
                return
            }
            this.$router.back()
        }
    },

    props: {
        navTitle: String,
        navBackTo: {
            type: Object as () => RouteLocationRaw | undefined
        }
    }
}
</script>

<style scoped lang="scss">
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    .navbar-toggler {
        font-size: 22px;
        &:focus {
            color: #6B7B93;
        }
    }
    .title {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
.navbar-brand {
    position: relative;
    z-index: 3;
    i {
        font-size: 30px;
    }
}
.right-action {
    position: relative;
    z-index: 3;
}
</style>
