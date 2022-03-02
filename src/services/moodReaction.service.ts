import { ApplicationException } from '../common/exceptions/application.exception'
import { MoodReactionCreateDto, MoodReactionUpdateDto } from '../dtos/moodReaction.dto'
import { MoodReactionRepository } from './repositories/moodReaction.repository'
import { MoodReaction } from './repositories/domain/moodReaction'

export class MoodReactionService {
    constructor(
        private readonly moodReactionRepository: MoodReactionRepository
    ) {}

    public async allByMoodId(moodId: number): Promise<MoodReaction[] | null> {
        return await this.moodReactionRepository.allByMoodId(moodId)
    }

    public async find(id: number): Promise<MoodReaction | null> {
        return await this.moodReactionRepository.find(id)
    }

    public async store(entry: MoodReactionCreateDto): Promise<void> {
        await this.moodReactionRepository.store(entry as MoodReaction)
    }

    public async update(id: number, entry: MoodReactionUpdateDto): Promise<void> {
        let originalEntry = await this.moodReactionRepository.find(id)

        if (originalEntry) {
            originalEntry.reaction_id = entry.reaction_id

            await this.moodReactionRepository.update(originalEntry)
        } else {
            throw new ApplicationException('Mood Reaction not found.')
        }
    }
}