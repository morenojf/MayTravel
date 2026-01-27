import { StopsModel } from "../model/StopsModel.mjs"

export class StopsController {
  static async create(req, res) {
    try {
      const data = req.body
      // eslint-disable-next-line no-unused-vars
      const result = await StopsModel.create(data)
      res.status(200).send({ message: 'Stop added correctly' })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }
}
