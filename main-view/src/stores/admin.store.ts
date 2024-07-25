import { defineStore } from 'pinia'

interface AdminState {

}

export const useAdminStore = defineStore('admin', {
    /**
     * States.
     */
    state: (): AdminState => ({
        //
    }),

    /**
     * Actions.
     */
    actions: {
        //
    }
})

export default { useAdminStore }
