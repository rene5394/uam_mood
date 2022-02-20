import { Feeling } from './repositories/domain/feeling'
import { FeelingRepository } from './repositories/feeling.repository'

export class FeelingService {
    constructor(
        private readonly feelingRepository: FeelingRepository
    ) {}

    public async all(): Promise<Feeling[]> {
        return await this.feelingRepository.all()
    }

    public async find(id: number): Promise<Feeling | null> {
        return await this.feelingRepository.find(id)
    }
}