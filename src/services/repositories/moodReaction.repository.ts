import { MoodReaction } from './domain/moodReaction'

export interface MoodReactionRepository {
    allByMoodId(moodId: number): Promise<MoodReaction[] | null>
    store(entry: MoodReaction): Promise<void>
    update(entry: MoodReaction): Promise<void>
}