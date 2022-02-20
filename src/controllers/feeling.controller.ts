import { Request, Response } from 'express'
import { GET, route } from 'awilix-express'
import { FeelingService } from '../services/feeling.service'

@route('/feelings')
export class FeelingController {
    constructor(
        private readonly feelingService: FeelingService
    ) {}
    
    @GET()
    public async all(req: Request, res: Response) {
        try {
            let result = await this.feelingService.all()

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

            let result = await this.feelingService.find(id)

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