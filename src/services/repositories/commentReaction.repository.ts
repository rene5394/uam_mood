import { CommentReaction } from './domain/commentReaction'

export interface CommentReactionRepository {
    allByCommentId(commentId: number): Promise<CommentReaction[] | null>
    store(entry: CommentReaction): Promise<void>
    update(entry: CommentReaction): Promise<void>
}