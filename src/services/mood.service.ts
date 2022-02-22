import { ApplicationException } from '../common/exceptions/application.exception'
import { MoodCreateDto, MoodUpdateDto } from '../dtos/mood.dto'
import { Mood } from './repositories/domain/mood'
import { MoodRepository } from './repositories/mood.repository'

export class MoodService {
    constructor(
        private readonly moodRepository: MoodRepository
    ) {}

    public async allByDate(date: Date): Promise<Mood[] | null> {
        return await this.moodRepository.allByDate(date)
    }

    public async find(id: number): Promise<Mood | null> {
        return await this.moodRepository.find(id)
    }

    public async store(entry: MoodCreateDto): Promise<void> {
        return await this.moodRepository.store(entry as Mood)
    }

    public async update(id: number, entry: MoodUpdateDto): Promise<void> {
        let originalEntry = await this.moodRepository.find(id)

        if (originalEntry) {
            originalEntry.feeling_id = entry.feeling_id
            originalEntry.comment = entry.comment

            await this.moodRepository.update(originalEntry)
        } else {
            throw new ApplicationException('Mood not found.')
        }
    }
}