import { Feeling } from './domain/feeling'

export interface FeelingRepository {
    all(): Promise<Feeling[]>
    find(id: number): Promise<Feeling | null>
}