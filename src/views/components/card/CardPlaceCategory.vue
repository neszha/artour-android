<template>
    <div class="card">
        <div class="card-box-img">
            <img v-lazy="category.popularPlace?.mapImageCover?.link" alt="..." class="card-img">
        </div>
        <div class="card-body p-3">
            <h3 class="title h4 mb-2">
                {{ category.name }}
            </h3>
            <p class="description mb-2">
                <span v-if="category.description.length > 110">{{ category.description.substring(0, 110) }}...</span>
                <span v-else>{{ category.description }}</span>
            </p>
            <RouterLink
                :to="{ name: 'maps', query: { keyword: category.name.toLocaleLowerCase() } }"
                class="text-primary">
                <strong>EXPLORE</strong>
            </RouterLink>
        </div>
    </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { usePlaceStore } from '@/stores/place.store'
import { type PlaceCategoryEntity } from '@/interfaces/Place'

export default {
    computed: {
        ...mapState(usePlaceStore, ['placePreviewCategories']),

        category (): PlaceCategoryEntity {
            return this.placePreviewCategories.find((item: PlaceCategoryEntity) => item.id === this.categoryId) as PlaceCategoryEntity
        }
    },

    props: {
        categoryId: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
.card {
    width: 250px;
    overflow: hidden;
    .card-box-img {
        width: 100%;
        height: 160px;
    }
    .card-img {
        border-radius: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
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
