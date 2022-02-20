import connector from '../../../../common/persistent/mysql.persistent'
import { CommentReaction } from '../../domain/commentReaction'
import { CommentReactionRepository } from '../../commentReaction.repository'

export class CommentReactionMySQLRepository implements CommentReactionRepository {
    public async allByCommentId(commentId: number): Promise<CommentReaction[] | null> {
        const [rows] = await connector.execute(
            `SELECT 
            FROM comment_reactions
            INNER JOIN comments ON comment_reactions.comment_id = comments.id
            WHERE comments.id = ?`,
            [commentId]
        )

        return rows as CommentReaction[]
    }

    public async store(entry: CommentReaction): Promise<void> {
        const now = new Date()

        await connector.execute(
            'INSERT INTO(user_id, comment_id, reaction_id, created_at) VALUES(?, ?, ?, ?)',
            [entry.user_id, entry.comment_id, entry.reaction_id, now]
        )
    }

    public async update(entry: CommentReaction): Promise<void> {
        const now = new Date()

        await connector.execute(
            'UPDATE SET reaction_id = ?, updated_at = ? WHERE id = ?',
            [entry.reaction_id, now, entry.id]
        )
    }
}