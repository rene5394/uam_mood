import connector from '../../../../common/persistent/mysql.persistent'
import { Feeling } from '../../domain/feeling'
import { FeelingRepository } from '../../feeling.repository'

export class FeelingMySQLRepository implements FeelingRepository {
    public async all(): Promise<Feeling[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM feelings'
        )

        return rows as Feeling[]
    }

    public async find(id: number): Promise<Feeling | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM feelings WHERE id = ?',
            [id]
        )

        if (rows[0]) {
            return rows[0] as Feeling
        }

        return null
    }
}