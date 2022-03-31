import axios from 'axios'
import { Launch } from './dto/launch.dto'
import { Rocket } from './dto/rocket.dto'

export class SpaceXClient {
    getLaunches = async (): Promise<Launch[]> => {
        const endpoint = `https://api.spacexdata.com/v3/launches`
        try {
            return (await axios.get(endpoint)).data as Launch[]
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    getRockets = async (): Promise<Rocket[]> => {
        try {
            const endpoint = `https://api.spacexdata.com/v3/rockets`
            return (await axios.get(endpoint)).data as Rocket[]
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}
