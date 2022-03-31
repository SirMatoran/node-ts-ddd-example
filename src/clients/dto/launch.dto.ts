import { Rocket } from './rocket.dto'

export interface Launch {
    flight_number: number
    mission_name: string
    rocket: Rocket
}
