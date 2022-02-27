import connector from '../../../../common/persistent/mysql.persistent'
import { Comment } from '../../domain/comment'
import { CommentRepository } from '../../comment.repository'

export class CommentMySQLRepository implements CommentRepository {
    public async allByMoodId(moodId: number): Promise<Comment[] | null> {
        const [rows] = await connector.execute(
            `SELECT comments.*
            FROM comments
            INNER JOIN moods ON comments.mood_id = moods.id
            WHERE moods.id = ?`,
            [moodId]
        )

        return rows as Comment[]
    }

    public async find(id: number): Promise<Comment | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM comments WHERE id = ?',
            [id]
        )

        if (rows[0]) {
            return rows[0] as Comment
        }

        return null
    }

    public async store(entry: Comment): Promise<void> {
        const now = new Date()

        await connector.execute(
            'INSERT INTO comments(user_id, mood_id, comment, created_at) VALUES(?, ?, ?, ?)',
            [entry.user_id, entry.mood_id, entry.comment, now]
        )
    }

    public async update(entry: Comment): Promise<void> {
        const now = new Date()
        
        await connector.execute(
            'UPDATE comments SET mood_id = ?, comment = ?, updated_at = ? WHERE id = ?',
            [entry.mood_id, entry.comment, now, entry.id]
        )
    }
}