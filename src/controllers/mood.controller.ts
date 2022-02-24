import { Request, Response } from 'express'
import { route, GET, POST, PUT } from 'awilix-express'
import { MoodCreateDto, MoodUpdateDto } from '../dtos/mood.dto'
import { MoodService } from '../services/mood.service'
import { storeMoodSchema, updateMoodSchema } from '../schemas/mood.schema'

@route('/moods')
export class MoodController {
    constructor(
        private readonly moodService: MoodService
    ) {}
    
    @route('date/:date')
    @GET()
    public async allByDate(req: Request, res: Response) {
        try {
            const date = new Date(req.params.date)
            
            const result = await this.moodService.allByDate(date)

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

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)

            const result = await this.moodService.find(id)

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
    public async store(req: Request, res: Response) {
        try {
            const { error, value } = storeMoodSchema.validate({
                user_id: req.body.user_id,
                feeling_id: req.body.feeling_id,
                comment: req.body.comment
            })

            if (!error) {
                let mood = value

                await this.moodService.store(
                     mood as MoodCreateDto
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

            const { error } = updateMoodSchema.validate({
                id: id,
                feeling_id: req.body.feeling_id,
                comment: req.body.comment
            })

            if (!error) {
                await this.moodService.update(id, {
                    feeling_id: req.body.feeling_id,
                    comment: req.body.comment
                } as MoodUpdateDto)
    
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