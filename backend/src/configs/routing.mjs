// importacion de Router
import { Router } from 'express'

// middlewares
import { validateInfo } from '../middlewares/UsersValid.mjs'


// importación de controladores
import { UsersController } from "../components/users/controller/UsersController.mjs"
import { InterestController } from '../components/interests/controller/InterestsController.mjs'


// exportación de rutas
export const routing = Router()

// USERS 
// managment (CRUD)
routing.get('/users', UsersController.getAll)
routing.get('/users/:id', UsersController.getById)
routing.post('/users', UsersController.create)
routing.delete('/users/:id', UsersController.delete)
routing.put('/users/:id', validateInfo, UsersController.editInfo)

// Action routes USERS.
// auth login users
routing.post('/auth/login', UsersController.authLogin)
// register users
routing.post('/auth/register', UsersController.authRegister)

// INTERESTS
// managment (CRUD)
routing.get('/interests', InterestController.getAll)
routing.post('/interests', InterestController.create)
routing.delete('/interests/:id', InterestController.delete)
routing.put('/interests/:id', InterestController.update)

// interests-users
routing.get('/users/:id/interests', UsersController.getInterests)
routing.post('/users/:id/interests', UsersController.addInterests)


