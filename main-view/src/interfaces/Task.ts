import { type File } from './File'
import { type NestResponse } from './Nest'
import { type TaskFromEnum, type TaskStatusEnum } from './enums'

export interface FilterOptions {
    excludeQuotes: boolean
    excludeBibliography: boolean
    excludeSourceSizes: {
        words: number
        percent: number
        useExcludeSource: boolean
    }
}

export interface Task {
    id: string
    userId: string
    from: TaskFromEnum
    status: TaskStatusEnum
    orderNumber: number
    fileId: string
    fileterOptions: FilterOptions
    fee: number
    similarity: number | null
    screenshotFileId: string | null
    resultFileId: string | null
    workerId: string | null
    timeoutProcessOn: string | null
    wakeupWorkerOn: string
    createdAt: Date
    updatedAt: Date

    // More fields.
    file?: File
    screenshotFile?: File
    resultFile?: File
}

export interface CreateTaskBody {
    fileIds: string[]
    filterOptions: FilterOptions
}

export interface NewTaskResponse extends NestResponse {
    data: Task[]
}
