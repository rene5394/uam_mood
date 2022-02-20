import { ApplicationException } from '../common/exceptions/application.exception'
import { CommentCreateDto, CommentUpdateDto } from '../dtos/comment.dto'
import { CommentRepository } from './repositories/comment.repository'
import { Comment } from './repositories/domain/comment'

export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository
     ) {}

    public async allByMoodId(moodId: number): Promise<Comment[] | null> {
        return await this.commentRepository.allByMoodId(moodId)
    }

    public async find(id: number): Promise<Comment | null> {
        return await this.commentRepository.find(id)
    }

    public async store(entry: CommentCreateDto): Promise<void> {
        return await this.commentRepository.store(entry as Comment)
    }

    public async update(id: number, entry: CommentUpdateDto): Promise<void> {
        let originalEntry = await this.commentRepository.find(id)
        
        if (originalEntry) {
            originalEntry.comment = entry.comment

            await this.commentRepository.update(originalEntry)
        } else {
            throw new ApplicationException('Mood not found.');
        }
    }
}