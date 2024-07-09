import { type OpeningHoursDay } from '@/interfaces/Place'
import { defineStore } from 'pinia'

export interface ModalState {
    openingHoursDay: OpeningHoursDay
}

export const useModalStore = defineStore('modal', {
    /**
     * States.
     */
    state: (): ModalState => ({
        openingHoursDay: {
            dayIndex: 0,
            closed: true,
            fullOpeningHours: false,
            openingHours: '00:00',
            closingHours: '00:00'
        }
    }),

    /**
     * Actions.
     */
    actions: {
        setOpenHoursDayData (data: OpeningHoursDay) {
            this.openingHoursDay = data
        }
    }
})

export default { useModalStore }
