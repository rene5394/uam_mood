import { CommentReaction } from './domain/commentReaction'

export interface CommentReactionRepository {
    allByCommentId(commentId: number): Promise<CommentReaction[] | null>
}