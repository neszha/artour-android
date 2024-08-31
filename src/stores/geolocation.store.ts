import { defineStore } from 'pinia'
import { type Coordinates } from '@/interfaces/Geolocation'
import { IN_TEST_MODE } from '@/constants/environment'
import { TestCoordinate } from '@/constants/test-data'

interface GeolocationState {
    coordinates: Coordinates
}

export const useGeolocationStore = defineStore('geolocation', {
    /**
     * States.
     */
    state: (): GeolocationState => ({
        coordinates: {
            latitude: 0,
            longitude: 0,
            accuracy: 0
        }
    }),

    /**
     * Actions.
     */
    actions: {
        async getCurrentGeolocation (): Promise<Coordinates> {
            await new Promise((resolve): void => {
                if (navigator.geolocation !== undefined) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude, longitude, accuracy } = position.coords
                        if (IN_TEST_MODE) {
                            this.coordinates = {
                                latitude: TestCoordinate.latitude,
                                longitude: TestCoordinate.longitude,
                                accuracy
                            }
                        } else {
                            this.coordinates = { latitude, longitude, accuracy }
                        }
                        console.log({ IN_TEST_MODE })
                        console.log(this.coordinates)
                        resolve(true)
                    }, () => {
                        setTimeout(() => {
                            this.getCurrentGeolocation().catch(console.error)
                        }, 2_500)
                        resolve(false)
                    })
                } else {
                    alert('Geolocation is not supported in your device.')
                }
            })
            return this.coordinates
        }
    }
})

export default { useGeolocationStore }
