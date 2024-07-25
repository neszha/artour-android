import moment from 'moment'
import { type OpeningHoursStatus, type OpeningHoursDay } from '@/interfaces/Place'

export const getPlaceOpenHourStatus = (data: OpeningHoursDay): OpeningHoursStatus => {
    const status = {
        open: false,
        content: ''
    }
    if (data.closed) {
        status.open = false
        status.content = 'Tutup'
        return status
    }
    if (data.fullOpeningHours) {
        status.open = true
        status.content = 'Buka 24 Jam'
        return status
    }
    const time = moment().format('HH:mm')
    status.content = `${data.openingHours} - ${data.closingHours}`
    if (time >= data.openingHours && time < data.closingHours) {
        status.open = true
        status.content += ' (Buka)'
        return status
    }
    status.content += ' (Tutup)'
    return status
}
