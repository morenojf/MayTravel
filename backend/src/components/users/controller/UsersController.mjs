import { UsersService } from '../service/UsersService.mjs'
import { UsersModel } from '../model/UsersModel.mjs'

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
      const id = req.params.id
      const user = await UsersModel.getById(id)
      !user.length
        ? res.status(404).json({ error: `The user ID ${id} was not found` })
        : res.status(200).send(user)
    } catch (error) {
      res.status(500).send({ error: error.message || error })
    }
  }

  // Crear un nuevo usuario
  static async create(req, res) {
    try {
      // eslint-disable-next-line no-unused-vars
      const newUser = await UsersModel.create(req.body)
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
        : res.status(200).send({mssg: `User ID ${id} updated succesfully`})
    } catch (error) {
      res.status(500).send({ error: error.message || error })
    }
  }
}
