import { defineStore } from 'pinia'
import axiosDefault, { type AxiosResponse } from 'axios'
import axios from '@/helpers/axios.helper'
import { type Task } from '@/interfaces/Task'
import { AuthFromEnum } from '@/interfaces/enums'
import { API_URL_TASKS, API_URL_TASKS_ID } from '@/constants/api-url'

export interface TaskState {
    tasks: Task[]
    task: Task | null
    gettingTaskQueues: boolean
}

export const useTaskStore = defineStore('task', {
    /**
     * States.
     */
    state: (): TaskState => ({
        tasks: [],
        task: null, // Show in detail.
        gettingTaskQueues: false
    }),

    /**
     * Actions.
     */
    actions: {
        async getTasks (): Promise<void> {
            try {
                const response: AxiosResponse = await axios.get(`${API_URL_TASKS}?authFrom=${AuthFromEnum.MOBILE_TASK}`)
                this.tasks = response.data.data as Task[]
            } catch (error) {
                console.error(error)
            }
        },

        async deleteTaskById (taskId: string): Promise<boolean> {
            try {
                await axios.delete(API_URL_TASKS_ID.replace(':taskId', taskId))
                return true
            } catch (error) {
                if (axiosDefault.isAxiosError(error)) {
                    const message = error.response?.data.message as string
                    alert(message ?? 'Something went wrong.')
                }
                return false
            }
        }
    }
})

export default { useTaskStore }
