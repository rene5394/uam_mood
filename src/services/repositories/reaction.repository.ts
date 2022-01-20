import { Reaction } from './domain/reaction'

export interface ReactionRepository {
    all(): Promise<Reaction[]>
    find(id: number): Promise<Reaction | null>
}