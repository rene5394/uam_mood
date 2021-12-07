import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from "awilix-express";

@route('/comment')
export class CommentController {
    constructor() {}

    @GET()
    public async all(req: Request, res: Response) {
        // All
    }

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        // Find
    }

    @POST()
    public async store(req: Request, res: Response) {
        // Store
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        // Update
    }

    @route('/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {
        // Delete
    }
}