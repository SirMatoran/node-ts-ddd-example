import 'reflect-metadata'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import { PackageService } from './src/domain/services/package.service'
import { PackageController } from './src/api/controllers/package.controller'
import { SpaceXService } from './src/domain/services/space-x.service'
import { SpaceXController } from './src/api/controllers/space-x.controller'
import { DatabaseService } from './src/infraestructure/persistence/database.service'

// set up container
const container = new Container()

// set up bindings
container.bind<PackageService>('PackageService').to(PackageService)
container.bind<PackageController>('PackageController').to(PackageController)

container.bind<SpaceXService>('SpaceXService').to(SpaceXService)
container.bind<SpaceXController>('SpaceXController').to(SpaceXController)

container.bind<DatabaseService>('DatabaseService').to(DatabaseService)

// create server
const server = new InversifyExpressServer(container, null, {
    rootPath: '/api/v1',
})

const app = server.build()

app.listen(3000, () => {
    console.log('Tracking API Running')
})
