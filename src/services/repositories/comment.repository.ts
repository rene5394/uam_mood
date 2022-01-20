import { Comment } from './domain/comment'

export interface CommentRepository {
    allByMoodId(moodId: number): Promise<Comment[] | null>
    find(id: number): Promise<Comment | null>
}