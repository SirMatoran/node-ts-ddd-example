import { inject } from 'inversify'
import { interfaces, controller, httpGet, httpPost, requestParam, queryParam } from 'inversify-express-utils'
import { SpaceXService } from '../../domain/services/space-x.service'
import { CustomResponse } from '../contracts/custom-response'
import { Launch } from '../dto/launch.dto'

@controller('/spacex')
export class SpaceXController implements interfaces.Controller {
    constructor(@inject('SpaceXService') private service: SpaceXService) {}

    @httpGet('/launch')
    private getLaunches(): Promise<Launch[]> {
        try {
            return this.service.getLaunches()
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    @httpPost('/launch/:flight_number/swap-fav')
    private async swapFav(
        @requestParam('flight_number') flight_number: number,
        @queryParam('user_id') user_id: number
    ): Promise<CustomResponse<boolean>> {
        try {
            await this.service.swapFav({ user_id, flight_number })
            return new CustomResponse<boolean>(200, 'fav swipped')
        } catch (e) {
            console.log(e)
            return new CustomResponse<boolean>(500, 'un error')
        }
    }
}
