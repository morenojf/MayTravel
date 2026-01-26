import { PoisModel } from '../model/PoisModel.mjs'
import { PoisService } from '../service/PoisService.mjs'

export class PoisController {
  static async getAll(req, res) {
    try {
      const result = await PoisModel.getAll()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  static async create(req, res) {
    try {
      const data = req.body
      // eslint-disable-next-line no-unused-vars
      const result = PoisModel.create(data)
      res.status(200).send({ message: 'POI created succesfully' })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id
      // eslint-disable-next-line no-unused-vars
      const result = await PoisModel.delete(id)
      res.status(200).send({ message: `POI ${id} deleted sucessfully` })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  static async update(req, res) {
    try {
      const newData = req.body
      const id = req.params.id
      const result = await PoisService.update(newData, id)
      if (result === null)
        return res.status(200).send({ message: `Sin datos para actualizar` })
      res.status(200).send({ message: `POI ID ${id} updated succesfully` })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }
}
