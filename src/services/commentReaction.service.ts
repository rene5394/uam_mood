import { ApplicationException } from '../common/exceptions/application.exception'
import { CommentReactionCreateDto, CommentReactionUpdateDto} from '../dtos/commentReaction.dto'
import { CommentReactionRepository } from './repositories/commentReaction.repository'
import { CommentReaction } from './repositories/domain/commentReaction'

export class CommentReactionService {
    constructor(
        private readonly commentReactionRepository: CommentReactionRepository
    ) {}

    public async allByCommentId(CommentId: number): Promise<CommentReaction[] | null> {
        return await this.commentReactionRepository.allByCommentId(CommentId)
    }

    public async find(id: number): Promise<CommentReaction | null> {
        return await this.commentReactionRepository.find(id)
    }

    public async store(entry: CommentReactionCreateDto) {
        return await this.commentReactionRepository.store(entry as CommentReaction)
    }

    public async update(id: number, entry: CommentReactionUpdateDto) {
        let originalEntry = await this.commentReactionRepository.find(id)

        if (originalEntry) {
            originalEntry.reaction_id = entry.reaction_id

            await this.commentReactionRepository.update(originalEntry)
        } else {
            throw new ApplicationException('Comment Reaction not found.')
        }
     }
     
}