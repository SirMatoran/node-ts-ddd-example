import { inject, injectable } from 'inversify'
import { DatabaseService } from '../../infraestructure/persistence/database.service'
import { PackageRepository } from '../../infraestructure/repositories/package.repository'
import { Package } from '../entities/package.entity'

@injectable()
export class PackageService {
    constructor(@inject('DatabaseService') private readonly database: DatabaseService) {}

    public getAll = async (): Promise<Package[]> => {
        const repo = await this.database.getRepository(PackageRepository)
        return repo.getAll()
    }
}
