import * as express from 'express'
import { interfaces, controller, httpGet, request, response, next } from 'inversify-express-utils'
import { inject } from 'inversify'
import { PackageService } from '../../domain/services/package.service'
import { Package } from '../../domain/entities/package.entity'

@controller('/package')
export class PackageController implements interfaces.Controller {
    constructor(@inject('PackageService') private packageService: PackageService) {}

    @httpGet('/')
    private getAll(
        @request() req: express.Request,
        @response() res: express.Response,
        @next() next: express.NextFunction
    ): Promise<Package[]> {
        return this.packageService.getAll()
    }
}
