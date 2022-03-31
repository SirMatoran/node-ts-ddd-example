import { EntityRepository, Repository } from 'typeorm'
import { Fav } from '../../domain/entities/fav.entity'

@EntityRepository(Fav)
export class FavRepository extends Repository<Fav> {}
