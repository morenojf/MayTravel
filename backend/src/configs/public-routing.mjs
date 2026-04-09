import { Router } from 'express'
import { UsersController } from '../components/users/controller/UsersController.mjs'

export const publicRouting = Router()

// auth login users
publicRouting.post('/login', UsersController.authLogin)
// register users
publicRouting.post('/register', UsersController.authRegister)
