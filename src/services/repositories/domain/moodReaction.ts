export interface MoodReaction {
    id: number,
    user_id: number,
    mood_id: number,
    reaction_id: number,
    created_at: Date | null,
    updated_at: Date | null
}