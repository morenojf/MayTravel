// importacion de Router
import { Router } from 'express'

// middlewares
import { validateInfo } from '../middlewares/UsersValid.mjs'


// importación de controladores
import { UsersController } from "../components/users/controller/UsersController.mjs"


// exportación de rutas
export const routing = Router()

// routing.get('/dashboard/:id', dashboardController.getAll)

routing.get('/all-users', UsersController.getAll)
routing.get('/users/:id', UsersController.getById)
routing.post('/users', UsersController.create)
routing.delete('/users/:id', UsersController.delete)
routing.put('/users-info/:id', validateInfo, UsersController.editInfo)

