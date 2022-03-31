import { AbstractRepository, EntityRepository } from 'typeorm'
import { Package } from '../../domain/entities/package.entity'
@EntityRepository(Package)
export class PackageRepository extends AbstractRepository<Package> {
    async getAll(): Promise<Package[]> {
        return await this.repository.find()
    }
}
