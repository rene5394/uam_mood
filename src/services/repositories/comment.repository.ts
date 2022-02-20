import { Comment } from './domain/comment'

export interface CommentRepository {
    allByMoodId(moodId: number): Promise<Comment[] | null>
    find(id: number): Promise<Comment | null>
    store(entry: Comment): Promise<void>
    update(entry: Comment): Promise<void>
}