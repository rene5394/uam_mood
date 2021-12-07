import { Application } from 'express'
import { asClass, createContainer } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { UserMySQLRepository } from './services/repositories/implementation/mysql/user.repository'
import { UserService } from './services/user.service'

export default (app: Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    })

    container.register({
        // Repositories
        userRepository: asClass(UserMySQLRepository).scoped(),

        // Services
        userService: asClass(UserService).scoped()
    })

    app.use(scopePerRequest(container))
}