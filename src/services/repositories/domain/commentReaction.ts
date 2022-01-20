export interface CommentReaction {
    id: number,
    user_id: number,
    comment_id: number,
    reaction_id: number,
    created_at: Date | null,
    updated_at: Date | null
}