import connector from '../../../../common/persistent/mysql.persistent'
import { MoodReaction } from '../../domain/moodReaction'
import { MoodReactionRepository } from '../../moodReaction.repository'

export class MoodReactionMySQLRepository implements MoodReactionRepository {
    public async allByMoodId(moodId: number): Promise<MoodReaction[] | null> {
        const [rows] = await connector.execute(
            `SELECT mood_reactions.*
            FROM mood_reactions
            INNER JOIN moods ON mood_reactions.mood_id = moods.id
            WHERE moods.id = ?`,
            [moodId]
        )

        return rows as MoodReaction[]
    }

    public async find(id: number): Promise<MoodReaction | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM mood_reactions WHERE id = ?',
            [id]
        )

        if (rows[0]) {
            return rows[0] as MoodReaction
        }

        return null
    }

    public async store(entry: MoodReaction): Promise<void> {
    await connector.execute(
            'INSERT INTO mood_reactions(user_id, mood_id, reaction_id) VALUES(?, ?, ?)',
            [entry.user_id, entry.mood_id, entry.reaction_id]
        )
    }

    public async update(entry: MoodReaction): Promise<void> {
        await connector.execute(
            'UPDATE mood_reactions SET reaction_id = ? WHERE id = ?',
            [entry.reaction_id, entry.id]
        )
    }
}