<template>
    <div class="modal fade modal-animate anim-blur" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body pt-4">
                    <button ref="close" type="button" class="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="row">
                        <div class="col-6 mb-2">
                            <div class="form-check">
                                <input v-model="openingHoursDay.closed" class="form-check-input" type="checkbox" id="close">
                                <label class="form-check-label" for="close">Tutup</label>
                            </div>
                        </div>
                        <div class="col-6 mb-2">
                            <div class="form-check">
                                <input v-model="openingHoursDay.fullOpeningHours" class="form-check-input" type="checkbox" id="fullOpen" value="true">
                                <label class="form-check-label" for="fullOpen">Buka 24 Jam</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="form-check-label" for="openHour">Jam Buka</label>
                            <input v-model="openingHoursDay.openingHours" type="time" class="form-control" id="openHour" value="00:00">
                        </div>
                        <div class="col-6">
                            <label class="form-check-label" for="closeHour">Jam Tutup</label>
                            <input v-model="openingHoursDay.closingHours" type="time" class="form-control" id="closeHour" value="00:00">
                        </div>
                    </div>
                    <div class="mt-4 d-flex justify-content-end">
                        <button @click="($refs.close as  HTMLElement).click()" type="button" class="btn btn-sm btn-link text-secondary" for="checkFilterFree">Batal</button>
                        <button @click="saveSetting()" type="button" class="btn btn-sm btn-link" for="checkFilterFree">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useModalStore } from '@/stores/modal.store'
import { mapState } from 'pinia'

export default {
    computed: {
        ...mapState(useModalStore, ['openingHoursDay'])
    },

    methods: {
        saveSetting () {
            this.$emit('saved', this.openingHoursDay.dayIndex);
            (this.$refs.close as HTMLElement).click()
        }
    },

    watch: {
        'openingHoursDay.closed': {
            handler () {
                if (this.openingHoursDay.closed === true) {
                    this.openingHoursDay.fullOpeningHours = false
                    this.openingHoursDay.openingHours = '00:00'
                    this.openingHoursDay.closingHours = '00:00'
                }
            }
        },
        'openingHoursDay.fullOpeningHours': {
            handler () {
                if (this.openingHoursDay.fullOpeningHours === true) {
                    this.openingHoursDay.closed = false
                    this.openingHoursDay.openingHours = '00:00'
                    this.openingHoursDay.closingHours = '00:00'
                }
            }
        },
        openingHoursDay: {
            deep: true,
            handler () {
                const { openingHours, closingHours } = this.openingHoursDay
                if (openingHours !== '00:00' || closingHours !== '00:00') {
                    this.openingHoursDay.closed = false
                    this.openingHoursDay.fullOpeningHours = false
                }
            }
        }
    }
}
</script>
