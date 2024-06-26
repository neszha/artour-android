<script setup lang="ts">
import { filesize } from 'filesize'
</script>

<template>
    <div class="card card-transparent">
        <div class="card-body">
            <div class="row">
                <div class="col-12 mb-3">
                    <form id="dropzone" class="dropzone">
                        <div class="fallback">
                            <input name="file" type="file" multiple>
                        </div>
                    </form>
                </div>
                <div class="col-12">
                    <ul class="list-group list-group-flush">
                        <li v-for="(file) in forms.uploadFiles.files" :key="file.id" class="list-group-item px-0">
                            <div :title="file.originalName" class="d-flex align-items-center">
                                <div class="flex-grow-1">
                                    <div class="row g-1">
                                        <div class="col-8">
                                            <h6 class="mb-0">{{ file.originalName }}</h6>
                                            <p class="text-muted mb-0">
                                                <small>Size: {{ filesize(Number(file.size), {standard: 'jedec'}) }}</small>
                                                <small> - </small>
                                                <small>{{ file.wordCount.toLocaleString('id-ID') }} Words</small>
                                            </p>
                                        </div>
                                        <div class="col-4 d-flex align-items-center justify-content-end">
                                            <a @click="unUseFile(file.id)" href="javascript:void(0)" class="avtar avtar-xs btn-link-danger btn-pc-default">
                                                <i class="ti ti-x f-20"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <form @submit.prevent="createNewTasks" class="row mt-2">
                <div id="task-filter-options" class="col-12">
                    <div class="form-group">
                        <label for="excludeBibliography">Filter Options:</label>
                    </div>
                    <div class="form-group form-check">
                        <input v-model="forms.createTask.data.filterOptions.excludeBibliography" type="checkbox" class="form-check-input" id="excludeBibliography">
                        <label for="excludeBibliography">Exclude Bibliography</label>
                    </div>
                    <div class="form-group form-check">
                        <input v-model="forms.createTask.data.filterOptions.excludeQuotes" type="checkbox" class="form-check-input" id="excludeQuotes">
                        <label for="excludeQuotes">Exclude Quotes</label>
                    </div>
                    <div class="form-group form-check">
                        <input v-model="forms.createTask.data.filterOptions.excludeSourceSizes.useExcludeSource" type="checkbox" class="form-check-input" id="useExcludeSource">
                        <label for="useExcludeSource">Exclude sources that are less than:</label>
                    </div>
                    <div v-if="forms.createTask.data.filterOptions.excludeSourceSizes.useExcludeSource" class="ms-4">
                        <div class="form-group form-check d-flex gap-2 align-items-center">
                            <input :checked="forms.createTask.data.filterOptions.excludeSourceSizes.words !== 0" type="radio" id="by-words" name="exclude-source" class="form-check-input">
                            <input v-model="forms.createTask.data.filterOptions.excludeSourceSizes.words" @click="choiceExcludeSource('by-words')" type="number" min="0" step="1" class="form-control form-control-sm" style="width: 100px;">
                            <label for="by-words">words</label>
                        </div>
                        <div class="form-group form-check d-flex gap-2 align-items-center">
                            <input :checked="forms.createTask.data.filterOptions.excludeSourceSizes.percent !== 0" type="radio" id="by-percent" name="exclude-source" class="form-check-input">
                            <input v-model="forms.createTask.data.filterOptions.excludeSourceSizes.percent" @click="choiceExcludeSource('by-percent')" type="number" min="0" step="1" max="100" class="form-control form-control-sm" style="width: 100px;">
                            <label for="by-percent">%</label>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-2">
                    <div class="alert alert-info" role="alert">
                        <span>To get accurate results, set the filter options according to your needs. </span>
                        <a href="https://guides.turnitin.com/hc/en-us/articles/23503006879885-Using-exclusions-and-filters" target="_blank">Lern more!</a>
                    </div>
                </div>
                <div class="col-12">
                    <div class="d-grid mt-3">
                        <button :disabled="!isEnableActionButton" type="submit" class="btn btn-lg btn-primary waves-effect waves-light">
                            <span v-if="forms.createTask.loading">Submiting...</span>
                            <span v-else>Submit Task</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Dropzone from 'dropzone'
import Toastify from 'toastify-js'
import { type AxiosError } from 'axios'
import axios from '@/helpers/axios.helper'
import { type File } from '@/interfaces/File'
import { AuthFromEnum } from '@/interfaces/enums'
import { API_BASE_URL } from '@/constants/environment'
import { API_URL_FILES, API_URL_TASKS } from '@/constants/api-url'
import { type NewTaskResponse, type CreateTaskBody } from '@/interfaces/Task'
import { mapActions } from 'pinia'
import { useTaskStore } from '@/stores/task.store'

export default {

    computed: {
        isEnableActionButton (): boolean {
            const { loading, data: { fileIds } } = this.forms.createTask
            if (this.forms.uploadFiles.loading === true || loading === true) return false
            if (fileIds.length === 0) return false
            return true
        }
    },

    methods: {
        ...mapActions(useTaskStore, ['getTasks']),

        dropzoneHandler (): void {
            const url = new URL(`${API_BASE_URL}${API_URL_FILES}`)
            url.searchParams.append('fromAuth', AuthFromEnum.MOBILE_TASK)
            const dropzone = new Dropzone('#dropzone', {
                url: url.toString(),
                method: 'POST',
                paramName: 'file',
                maxFilesize: 50,
                timeout: 1000 * 30, // 30 seconds
                dictDefaultMessage: 'Click and select files for upload your document!'
            })
            dropzone.on('addedfile', () => {
                this.forms.uploadFiles.loading = true
            })
            dropzone.on('complete', (file) => {
                if (file.xhr === undefined) return
                if (file.xhr.status === 201) {
                    const response = JSON.parse(file.xhr.response as string)
                    const fileData = response.data as File
                    this.forms.uploadFiles.files.push(fileData)
                    this.forms.createTask.data.fileIds.push(fileData.id as never)
                    this.forms.uploadFiles.loading = false
                }
            })
            this.dropzone = dropzone
        },

        createNewTasks (): void {
            const { createTask } = this.forms
            createTask.loading = true
            axios.post(`${API_URL_TASKS}?authFrom=${AuthFromEnum.MOBILE_TASK}`, createTask.data).then(async () => {
                await this.getTasks()
                Toastify({
                    text: 'Successfully added new task.',
                    duration: 2_000,
                    gravity: 'top',
                    position: 'center'
                }).showToast()
                this.$router.push({ name: 'home' })
            }).catch((error: AxiosError) => {
                const data = error.response?.data as NewTaskResponse
                alert(data.message)
                createTask.loading = false
            })
        },

        unUseFile (id: string) {
            this.forms.uploadFiles.files = this.forms.uploadFiles.files.filter(item => item.id !== id)
            this.forms.createTask.data.fileIds = this.forms.uploadFiles.files.map(item => item.id as never)
        },

        choiceExcludeSource (key: string) {
            if (key === this.keyTemp) return
            const { excludeSourceSizes } = this.forms.createTask.data.filterOptions
            if (key === 'by-words') {
                excludeSourceSizes.useExcludeSource = true
                excludeSourceSizes.words = 1
                excludeSourceSizes.percent = 0
            } else if (key === 'by-percent') {
                excludeSourceSizes.useExcludeSource = true
                excludeSourceSizes.words = 0
                excludeSourceSizes.percent = 1
            }
            this.keyTemp = key
        }
    },

    mounted () {
        this.dropzoneHandler()
    },

    beforeUnmount () {
        if (this.dropzone !== null) {
            this.dropzone.destroy()
        }
    },

    data () {
        return {
            dropzone: null as Dropzone | null,
            forms: {
                uploadFiles: {
                    loading: false,
                    files: [] as File[]
                },
                createTask: {
                    loading: false,
                    data: {
                        fileIds: [],
                        filterOptions: {
                            excludeQuotes: true,
                            excludeBibliography: true,
                            excludeSourceSizes: {
                                words: 1,
                                percent: 0,
                                useExcludeSource: true
                            }
                        }
                    } satisfies CreateTaskBody
                }
            },
            keyTemp: ''
        }
    }
}
</script>

<style scoped lang="scss">
.dropzone {
    background-color: transparent;
}
.list-group {
    .list-group-item {
        border-radius: 0 !important;
        background-color: transparent !important;
    }
}
</style>
