import connector from '../../../../common/persistent/mysql.persistent'
import { MoodReaction } from '../../domain/moodReaction'
import { MoodReactionRepository } from '../../moodReaction.repository'

export class MoodReactionMySQLRepository implements MoodReactionRepository {
    public async allByMoodId(moodId: number): Promise<MoodReaction[] | null> {
        const [rows] = await connector.execute(
            `SELECT mood_reactions.*
            FROM mood_reactions
            INNER JOIN moods ON mood_reactions.reaction_id = moods.id
            WHERE moods.id = ?`,
            [moodId]
        )

        return rows as MoodReaction[]
    }

    public async store(entry: MoodReaction): Promise<void> {
        const now = new Date()

        await connector.execute(
            'INSERT INTO mood_reactions(user_id, mood_id, reaction_id, created_at) VALUES(?, ?, ?, ?)',
            [entry.user_id, entry.mood_id, entry.reaction_id, now]
        )
    }

    public async update(entry: MoodReaction): Promise<void> {
        const now = new Date()

        await connector.execute(
            'UPDATE mood_reactions SET reaction_id = ?, updated_at = ? WHERE id = ?',
            [entry.reaction_id, now, entry.id]
        )
    }
}