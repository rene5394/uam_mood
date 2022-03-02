import { Request, Response } from 'express'
import { route, GET, POST, PUT } from 'awilix-express'
import { CommentReactionService } from '../services/commentReaction.service'
import { CommentReactionCreateDto, CommentReactionUpdateDto } from '../dtos/commentReaction.dto'
import { storeCommentReactionSchema, updateCommentReactionSchema } from '../schemas/commentReaction.schema'

@route('/comment-reactions')
export class CommentReactionController {
    constructor(
        private readonly commentReactionService: CommentReactionService
    ) {}
    
    @route('/comment/:id')
    @GET()
    public async allByCommentId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)

            const result = await this.commentReactionService.allByCommentId(id)

            if (result) {
                res.status(200)
                res.send(result)

                return
            }

            res.status(400)
            res.send('Bad request')

            return
        } catch (error) {
            res.status(404)
            res.send(`${error}`)

            return
        }
    }

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)

            const result = await this.commentReactionService.find(id)

            if (result) {
                res.status(200)
                res.send(result)

                return
            }

            res.status(400)
            res.send()

            return
        } catch (error) {
            res.status(404)
            res.send(`${error}`)

            return
        }
    }

    @POST()
    public async store(req: Request, res: Response): Promise<void> {
        try {
            const { error, value } = storeCommentReactionSchema.validate({
                user_id: req.body.user_id,
                comment_id: req.body.comment_id,
                reaction_id: req.body.reaction_id
            })

            if (!error) {
                let commentReaction = value

                await this.commentReactionService.store(
                    commentReaction as CommentReactionCreateDto
                )
    
                res.status(201)
                res.send()

                return
            }

            res.status(400)
            res.send(`${error}`)

            return
        } catch (error) {
            res.status(404)
            res.send(`${error}`)

            return
        }
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)

            const { error } = updateCommentReactionSchema.validate({
                id: id,
                reaction_id: req.body.reaction_id
            })

            if (!error) {
                await this.commentReactionService.update(id, {
                    reaction_id: req.body.reaction_id
                } as CommentReactionUpdateDto)
    
                res.status(200)
                res.send()
    
                return
            }

            res.status(400)
            res.send(`${error}`)

            return
        } catch (error) {
            res.status(404)
            res.send(`${error}`)

            return
        }
    }
}