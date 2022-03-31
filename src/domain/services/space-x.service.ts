import { inject, injectable } from 'inversify'
import { Launch } from '../../api/dto/launch.dto'
import { Payload } from '../../api/dto/payload.dto'
import { Launch as ExternalLaunch } from '../../clients/dto/launch.dto'
import { Rocket as ExternalRocket } from '../../clients/dto/rocket.dto'
import { SpaceXClient } from '../../clients/space-x.client'
import { DatabaseService } from '../../infraestructure/persistence/database.service'
import { FavRepository } from '../../infraestructure/repositories/fav.repository'
import { Fav } from '../entities/fav.entity'

@injectable()
export class SpaceXService {
    constructor(@inject('DatabaseService') private readonly database: DatabaseService) {}

    public getLaunches = async (): Promise<Launch[]> => {
        const client = new SpaceXClient()
        const launches: ExternalLaunch[] = await client.getLaunches()
        const rockets: ExternalRocket[] = await client.getRockets()

        const response: Launch[] = launches.map((extLaunch) => {
            const rocket = rockets.find((r) => r.rocket_id == extLaunch.rocket.rocket_id)
            const payloads: Payload[] = extLaunch.rocket.second_stage.payloads.map((p) => {
                return {
                    type: p.payload_type,
                    payload_id: p.payload_id,
                    manufacturer: p.manufacturer,
                }
            })
            const launch: Launch = {
                flight_number: extLaunch.flight_number,
                mission_name: extLaunch.mission_name,
                rocket: {
                    rocket_id: extLaunch.rocket.rocket_id,
                    rocket_name: extLaunch.rocket.rocket_name,
                    description: rocket?.description || '',
                    images: rocket?.flickr_images || [],
                },
                payloads: payloads || [],
            }
            return launch
        })

        return response
    }

    public swapFav = async (fav: Fav): Promise<boolean> => {
        const favRepo = await this.database.getRepository(FavRepository)
        const alreadyFav = await favRepo.findOne(fav)
        if (alreadyFav) {
            await favRepo.delete(fav)
            return false
        }

        const creado = await favRepo.save(fav)
        return true
    }
}
