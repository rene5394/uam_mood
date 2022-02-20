import { Request, Response } from 'express'
import { route, GET } from 'awilix-express'
import { ReactionService } from '../services/reaction.service'

@route('/reactions')
export class ReactionController {
    constructor (
        private readonly reactionService: ReactionService
    ) {}
    
    @GET()
    public async all(req: Request, res: Response) {
        try {
            const result = await this.reactionService.all()

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

            const result = await this.reactionService.find(id)

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
}