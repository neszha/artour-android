<script setup lang="ts">
import { filesize } from 'filesize'
</script>

<template>
    <div class="card">
        <ul class="list-group list-group-flush">
            <li v-for="(task) of tasks" :key="task.id" @click="toTaskDetail(task.id)" class="list-group-item waves-effect">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="avtar avtar-s border">PDF</div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <div class="row g-1">
                            <div class="col-8">
                                <h6 class="mb-0">{{ task.file?.originalName }}</h6>
                                <p class="text-muted mb-0">
                                    <small>Size: {{ filesize(Number(task.file?.size), {standard: 'jedec'}) }}</small>
                                    <small> - </small>
                                    <small>{{ task.file?.wordCount.toLocaleString('id-ID') }} Words</small>
                                </p>
                            </div>
                            <div class="col-4 d-flex align-items-center justify-content-end">
                                <i class="ti ti-chevron-right f-22"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div v-if="tasks.length === 0" class="empty-list d-flex align-items-center">
        <div class="d-blok w-100">
            <div class="img-banner d-flex justify-content-center mb-5">
                <img src="@assets/images/elements/task-list-check.png" alt="img" class="img-fluid">
            </div>
            <div class="container text-center">
                <h2>Empty List!</h2>
                <p class="text-muted">Add new task to check your documents.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { useTaskStore } from '@/stores/task.store'

export default {

    computed: {
        ...mapState(useTaskStore, ['tasks'])
    },

    methods: {
        ...mapActions(useTaskStore, ['getTasks']),

        toTaskDetail (taskId: string) {
            setTimeout(() => {
                this.$router.push({
                    name: 'tasks:detail',
                    params: { taskId }
                })
            }, 150)
        }
    },

    beforeMount () {
        this.getTasks()
    }
}
</script>

<style scoped lang="scss">
.card {
    border-radius: 0 !important;
    background-color: transparent !important;
    border: none;
    margin-bottom: 0px;

    .avtar {
        font-size: 12px;
    }
}
.list-group {
    .list-group-item {
        border-radius: 0 !important;
        background-color: transparent !important;
    }
}
.empty-list {
    height: calc(100vh - 60px);
    min-height: 700px;

    .img-banner {
        img {
            transform: rotate(18deg);
            max-width: 200px;
        }
    }
}
</style>
