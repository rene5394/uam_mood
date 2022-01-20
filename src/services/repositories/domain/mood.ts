export interface Mood {
    id: number,
    user_id: number,
    feeling_id: number,
    comment: string | null,
    created_at: Date | null,
    updated_at: Date | null
}