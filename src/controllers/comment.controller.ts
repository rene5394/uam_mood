import { Request, Response } from 'express'
import { route, GET, POST, PUT } from 'awilix-express'
import { CommentService } from '../services/comment.service'
import { CommentCreateDto, CommentUpdateDto } from '../dtos/comment.dto'

@route('/comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) {}
    
    @route('/mood/:id')
    @GET()
    public async allByMoodId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)

            const result = await this.commentService.allByMoodId(id)

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

            const result = await this.commentService.find(id)

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
            await this.commentService.store({
                user_id: req.body.user_id,
                mood_id: req.body.mood_id,
                comment: req.body.comment
            } as CommentCreateDto)

            res.send(201)
            res.send()

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

            await this.commentService.update(id, {
                comment: req.body.comment
            } as CommentUpdateDto)

            res.status(200)
            res.send()

            return
        } catch (error) {
            res.status(404)
            res.send(`${error}`)

            return
        }
    }
}