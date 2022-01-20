import { Mood } from './domain/mood'

export interface MoodRepository {
    allByDate(date: Date): Promise<Mood[] | null>
    find(id: number): Promise<Mood | null>
    store(entry: Mood): Promise<void>
    update(entry: Mood): Promise<void>
}