import { Reaction } from './repositories/domain/reaction'
import { ReactionRepository } from './repositories/reaction.repository'

export class ReactionService {
    constructor(
        private readonly reactionRepository: ReactionRepository
    ) {}

    public async all(): Promise<Reaction[]> {
        return await this.reactionRepository.all()
    }

    public async find(id: number): Promise<Reaction | null> {
        return await this.reactionRepository.find(id)
    }
}