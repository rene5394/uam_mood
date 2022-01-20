import { MoodReaction } from './domain/moodReaction'

export interface MoodReactionRepository {
    allByMoodId(moodId: number): Promise<MoodReaction[] | null>
}