// importacion de Router
import { Router } from 'express'

// middlewares
import { validateInfo } from '../middlewares/UsersValid.mjs'


// importación de controladores
import { UsersController } from "../components/users/controller/UsersController.mjs"
import { InterestController } from '../components/interests/controller/InterestsController.mjs'
import { TripsController } from '../components/trips/controller/TripsController.mjs'


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

// interests-users
routing.get('/users/:id/interests', UsersController.getInterests) // this can work as a perfil page showing users info and interests
routing.post('/users/:id/interests', UsersController.addInterests)

// trips-users
routing.get('/users/:id/trips', TripsController.getByUser)


// INTERESTS
// managment (CRUD)
routing.get('/interests', InterestController.getAll)
routing.post('/interests', InterestController.create)
routing.delete('/interests/:id', InterestController.delete)
routing.put('/interests/:id', InterestController.update)

//TRIPS 
// managment (CRUD)
routing.get('/trips', TripsController.getAll)
routing.get('/trips/:id', TripsController.getById)
routing.delete('/trips/:id', TripsController.delete)
routing.post('/users/:id/trips', TripsController.create)



