import connector from '../../../../common/persistent/mysql.persistent'
import { Mood } from '../../domain/mood'
import { MoodRepository } from '../../mood.repository'

export class MoodMySQLRepository implements MoodRepository {
    public async allByDate(date: Date): Promise<Mood[] | null> {
        const [rows] = await connector.execute(
            `SELECT * FROM moods WHERE date(moods.created_at) = date(?)`,
            [date]
        )

        return rows as Mood[]
    }

    public async find(id: number): Promise<Mood | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM moods WHERE id = ?',
            [id]
        )

        if (rows[0]) {
            return rows[0] as Mood
        }

        return null
    }

    public async store(entry: Mood): Promise<void> {
        const now = new Date()

        await connector.execute(
            'INSERT INTO moods(user_id, feeling_id, comment) VALUES(?, ?, ?)',
            [entry.user_id, entry.feeling_id, entry.comment]
        )
    }

    public async update(entry: Mood): Promise<void> {
        await connector.execute(
            'UPDATE moods SET feeling_id = ?, comment = ? WHERE id = ?',
            [entry.feeling_id, entry.comment, entry.id]
        )
    }
}