import connector from '../../../../common/persistent/mysql.persistent'
import { User } from '../../domain/user'
import { UserRepository } from '../../user.repository'

export class UserMySQLRepository implements UserRepository{
    public async all(): Promise<User[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM users ORDER BY id DESC'
        )

        return rows as User[]
    }

    public async find(id: Number): Promise<User | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        )

        if (rows.lenght) {
            return rows[0] as User
        }

        return null
    }

    public async findByEmail(email: string): Promise<User | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if (rows.lenght) {
            return rows[0] as User
        }

        return null
    }

    public async store(entry: User): Promise<void> {
        const now = new Date()

        await connector.execute(
            'INSERT INTO users(firstname, lastname, email, created_at) VALUES(?, ?, ?, ?)',
            [entry.firstname, entry.lastname, entry.email, now]
        )
    }

    public async update(id: Number, entry: User): Promise<void> {
        const now = new Date();

        await connector.execute(
            'UPDATE users SET firstname = ?, lastname = ?, updated_at = ? WHERE id = ?',
            [entry.firstname, entry.lastname, entry.email, now, id]
        )
    }
}