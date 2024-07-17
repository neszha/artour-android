<template>
    <div class="card place-review-item py-4">
        <div class="container-fluid d-flex justify-content-between">
            <div class="d-flex align-items-center">
                <div class="me-2">
                    <div class="avatar avatar-md rounded-circle">
                        <img alt="..." :src="myInfo.avatar">
                    </div>
                </div>
                <div class="flex-fill">
                    <div class="d-block h6 font-semibold mb-1">{{ myInfo.name }}</div>
                    <div class="d-flex align-items-center gap-1">
                        <div class="rating d-flex gap-1">
                            <i v-for="i of 5" :key="i" class="bi bi-star text-warning"></i>
                        </div>
                    </div>
                </div>
            </div>
            <RouterLink :to="{name: 'place:add-review'}" class="btn btn-sm font-bold btn-neutral text-nowrap shadow-none waves-effect waves-dark">
                <i class="bi bi-plus" style="font-size: 30px;"></i>
            </RouterLink>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user.store'

export default {
    computed: {
        ...mapState(useUserStore, ['myInfo'])
    },

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
</style>
