import { dotenv } from './config'
import express, { Application, json } from 'express'
import { loadControllers } from 'awilix-express'
import loadContainer from './container'
import jwt from 'express-jwt'
import cors from 'cors'

dotenv.config()

const app: Application = express()

app.use(json())

app.use(cors())

loadContainer(app)

if (process.env.jwt_secret_key) {
    app.use(jwt({
        secret: process.env.jwt_secret_key,
        algorithms: ['HS256']
    }))
}

app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
))

export { app }