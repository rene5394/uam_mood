import { User } from "./domain/user";

export interface UserRepository {
    all(): Promise<User[]>
    find(id: Number): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    store(entry: User): Promise<void>
    update(id: Number, entry: User): Promise<void>
}