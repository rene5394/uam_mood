import express, { Application } from 'express'
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import jwt from 'express-jwt';
import cors from 'cors';
import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.APP_ENV = process.env.APP_ENV || 'development'

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
})

const app: Application = express()

app.use(express.json());

app.use(cors());

loadContainer(app)

app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
));

export { app }