import { Request, Response } from 'express'
import { route, GET, POST, PUT } from 'awilix-express'
import { MoodReactionService } from '../services/moodReaction.service'
import { MoodReactionCreateDto, MoodReactionUpdateDto } from '../dtos/moodReaction.dto'
import { storeMoodReactionSchema, updateMoodReactionSchema } from '../schemas/moodReaction.schema'

@route('/mood-reactions')
export class MoodReactionController {
    constructor(
        private readonly moodReactionService: MoodReactionService
    ) {}
    
    @route('/mood/:id')
    @GET()
    public async allByMoodId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)

            const result = await this.moodReactionService.allByMoodId(id)

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

            const result = await this.moodReactionService.find(id)

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
            const { error, value } = storeMoodReactionSchema.validate({
                user_id: req.body.user_id,
                mood_id: req.body.mood_id,
                reaction_id: req.body.reaction_id
            })

            if (!error) {
                let moodReaction = value

                await this.moodReactionService.store(
                    moodReaction as MoodReactionCreateDto
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

            const { error } = updateMoodReactionSchema.validate({
                id: id,
                reaction_id: req.body.reaction_id
            })

            if (!error) {
                await this.moodReactionService.update(id, {
                    reaction_id: req.body.reaction_id
                } as MoodReactionUpdateDto)
    
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