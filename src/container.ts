import { Application } from 'express'
import { asClass, createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { CommentService } from './services/comment.service'
import { CommentReactionService } from './services/commentReaction.service'
import { FeelingService } from './services/feeling.service'
import { MoodService } from './services/mood.service'
import { MoodReactionService } from './services/moodReaction.service'
import { ReactionService } from './services/reaction.service'
import { CommentMySQLRepository } from './services/repositories/implementation/mysql/comment.repository'
import { CommentReactionMySQLRepository } from './services/repositories/implementation/mysql/commentReaction.repository'
import { FeelingMySQLRepository } from './services/repositories/implementation/mysql/feeling.repository'
import { MoodReactionMySQLRepository } from './services/repositories/implementation/mysql/moodReaction.repository'
import { MoodMySQLRepository } from './services/repositories/implementation/mysql/mood.repository'
import { ReactionMySQLRepository } from './services/repositories/implementation/mysql/reaction.repository'
import { UserMySQLRepository } from './services/repositories/implementation/mysql/user.repository'

export default (app: Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    })

    container.register({
        // Repositories
        userRepository: asClass(UserMySQLRepository).scoped(),
        commentRepository: asClass(CommentMySQLRepository).scoped(),
        commentReactionRepository: asClass(CommentReactionMySQLRepository).scoped(),
        feelingRepository: asClass(FeelingMySQLRepository).scoped(),
        moodRepository: asClass(MoodMySQLRepository).scoped(),
        moodReactionRepository: asClass(MoodReactionMySQLRepository).scoped(),
        reactionRepository: asClass(ReactionMySQLRepository).scoped(),

        // Services
        commentService: asClass(CommentService).scoped(),
        commentReactionService: asClass(CommentReactionService).scoped(),
        feelingService: asClass(FeelingService).scoped(),
        moodService: asClass(MoodService).scoped(),
        moodReactionService: asClass(MoodReactionService).scoped(),
        reactionService: asClass(ReactionService).scoped()
    })

    app.use(scopePerRequest(container))
}