import connector from '../../../../common/persistent/mysql.persistent'
import { Reaction } from '../../domain/reaction'
import { ReactionRepository } from '../../reaction.repository'

export class ReactionMySQLRepository implements ReactionRepository {
    public async all(): Promise<Reaction[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM reactions'
        )

        return rows as Reaction[]
    }

    public async find(id: number): Promise<Reaction | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM reactions WHERE id = ?',
            [id]
        )

        if (rows[0]) {
            return rows[0] as Reaction
        }

        return null
    }
}