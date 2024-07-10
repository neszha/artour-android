<template>
    <nav class="navbar navbar-light border-bottom px-0 py-1">
        <div class="container-xl">
            <RouterLink :to="navBackTo" class="navbar-brand p-0">
                <i class="bi bi-arrow-left"></i>
            </RouterLink>
            <div class="title text-center">
                <h2 class="font-bold h3" style="font-style: bold !important;">
                    {{ navTitle }}
                </h2>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { type RouteLocationRaw } from 'vue-router'
export default {
    props: {
        navTitle: String,
        navBackTo: {
            type: Object as () => RouteLocationRaw,
            default: () => ({ name: 'explore' })
        }
    }
}
</script>

<style scoped lang="scss">
.navbar {
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
</style>
