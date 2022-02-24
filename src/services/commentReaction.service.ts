import { ApplicationException } from '../common/exceptions/application.exception'
import { CommentReactionRepository } from './repositories/commentReaction.repository'
import { CommentReaction } from './repositories/domain/commentReaction'

export class CommentReactionService {
    constructor(
        private readonly commentReactionRepository: CommentReactionRepository
     ) {}

     public async allByCommentId(CommentId: number): Promise<CommentReaction[] | null> {
         return await this.commentReactionRepository.allByCommentId(CommentId)
     }
     
}