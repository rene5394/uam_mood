export interface Comment {
    id: number,
    user_id: number,
    mood_id: number,
    comment: string,
    created_at: Date | null,
    updated_at: Date | null
}