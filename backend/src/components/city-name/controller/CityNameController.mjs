import { CityNameService } from '../service/CityNameService.mjs'

export class CityNameController {
  static async get(req, res) {
    const { q } = req.params

    try {
      const result = await CityNameService.getCityNames(q)
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }
}
