import { UsersService } from '../service/UsersService.mjs'
import { UsersModel } from '../model/UsersModel.mjs'
import generateAccessToken from '../../../services/auth.controller.mjs'

export class UsersController {
  // Obtener todos los usuarios
  static async getAll(req, res) {
    try {
      const usersInfo = await UsersModel.getAll()
      res.status(200).send(usersInfo)
    } catch (error) {
      res.status(500).send({ error: error.message || error })
    }
  }

  // Obtener usuario por ID
  static async getById(req, res) {
    try {
      const id = req.userId
      const user = await UsersModel.getById(id)
      !user.length
        ? res.status(404).json({ error: `The user ID ${id} was not found` })
        : res.status(200).send(user[0])
    } catch (error) {
      res.status(500).send({ error: error.message || error })
    }
  }

  // Crear un nuevo usuario
  static async create(req, res) {
    try {
      const { username, password, email, role } = req.body
      // eslint-disable-next-line no-unused-vars
      const newUser = await UsersModel.create({
        username,
        password,
        email,
        role
      })
      res.status(201).send({ mssg: 'Created succesfully' })
    } catch (error) {
      res.status(500).send({ error: error.message || error })
    }
  }

  // Eliminar usuario por ID
  static async delete(req, res) {
    try {
      const id = req.params.id
      // eslint-disable-next-line no-unused-vars
      const deletedUser = await UsersModel.delete(id)
      res.status(200).send({ mssg: `User number ${id} deleted successfully` })
    } catch (error) {
      res.status(500).send({ error: error.message || error })
    }
  }

  // Editar información de usuario
  static async editInfo(req, res) {
    try {
      const id = req.params.id
      const newInfo = req.body
      const editedUser = await UsersService.editInfo(id, newInfo)
      editedUser == null
        ? res.status(404).json({ error: `The user ID ${id} was not found` })
        : res.status(200).send({ mssg: `User ID ${id} updated succesfully` })
    } catch (error) {
      res.status(500).send({ error: error.message || error })
    }
  }

  // Auth Login
  static async authLogin(req, res) {
    try {
      const { identifier, password } = req.body

      const user = await UsersService.auth(identifier, password)
      //   si retorna un null cae acá
      if (user == null) {
        res.status(401).send({ message: 'Credenciales inválidas' })
      } else {
        const accessToken = generateAccessToken(user)

        res
          .cookie('token', accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600000 //duracion de una hora en milisegundos
          })
          .send({ message: 'Cookie is set' })
      }
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  // Auth Register
  static async authRegister(req, res) {
    try {
      const { username, email, password } = req.body
      // eslint-disable-next-line no-unused-vars
      const created = await UsersModel.create({ username, email, password })
      res.status(200).send({ message: 'User registered succesfully' })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  // Get users interests
  static async getInterests(req, res) {
    try {
      const { id } = req.params
      const result = await UsersService.getInterests(id)
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  // attach interests to an user
  static async addInterests(req, res) {
    try {
      const userId = req.params.id
      const { interests_id } = req.body
      // eslint-disable-next-line no-unused-vars
      const result = await UsersModel.addInterests(userId, interests_id)
      res
        .status(200)
        .send({ message: 'interests attached to the user correctly' })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }
}
