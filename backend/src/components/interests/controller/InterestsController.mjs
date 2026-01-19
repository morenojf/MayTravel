import { InterestsModel } from '../model/InterestsModel.mjs'

export class InterestController {
  static async getAll(req, res) {
    try {
      const result = await InterestsModel.getAll()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  static async create(req, res) {
    try {
      const { name } = req.body
      const result = await InterestsModel.create(name)
      res.status(201).send(result)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id
      // eslint-disable-next-line no-unused-vars
      const result = await InterestsModel.delete(id)
      res
        .status(200)
        .send({ message: `Interest ID ${id} was eliminated succesfully` })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id
      const { name } = req.body
      // eslint-disable-next-line no-unused-vars
      const result = await InterestsModel.update(name, id)
      res
        .status(200)
        .send({ message: `Interest ID ${id} data updated succesfully` })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

}
