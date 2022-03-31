import { PackageService } from '../../../domain/services/package.service'
jest.mock('../../repositories/package.repository')
import { PackageRepository } from '../../repositories/package.repository'

describe('Services:: Package', () => {
    test('Get All Packages', async () => {
        const repo = new PackageRepository()
        jest.spyOn(repo, 'getAll').mockImplementation(async () => [])
        const service = new PackageService(repo)

        const packages = await service.getAll()
        expect(Array.isArray(packages)).toBe(true)
    })
})
