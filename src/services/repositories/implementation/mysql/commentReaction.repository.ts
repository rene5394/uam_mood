import connector from '../../../../common/persistent/mysql.persistent'
import { CommentReaction } from '../../domain/commentReaction'
import { CommentReactionRepository } from '../../commentReaction.repository'

export class CommentReactionMySQLRepository implements CommentReactionRepository {
    public async allByCommentId(commentId: number): Promise<CommentReaction[] | null> {
        const [rows] = await connector.execute(
            `SELECT comment_reactions.*
            FROM comment_reactions
            INNER JOIN comments ON comment_reactions.comment_id = comments.id
            WHERE comments.id = ?`,
            [commentId]
        )

        return rows as CommentReaction[]
    }

    public async find(id: number): Promise<CommentReaction | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM comment_reactions WHERE id = ?',
            [id]
        )

        if (rows[0]) {
            return rows[0] as CommentReaction
        }

        return null
    }

    public async store(entry: CommentReaction): Promise<void> {
        await connector.execute(
            'INSERT INTO comment_reactions(user_id, comment_id, reaction_id) VALUES(?, ?, ?)',
            [entry.user_id, entry.comment_id, entry.reaction_id]
        )
    }

    public async update(entry: CommentReaction): Promise<void> {
        await connector.execute(
            'UPDATE comment_reactions SET reaction_id = ? WHERE id = ?',
            [entry.reaction_id, entry.id]
        )
    }
}