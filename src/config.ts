import dotenv from 'dotenv'

const NODE_ENV = process.env.NODE_ENV || 'development'
const APP_ENV = process.env.APP_ENV || 'development'

dotenv.config({
    path: `${__dirname}/../config/${APP_ENV}.env`
})

export { dotenv }