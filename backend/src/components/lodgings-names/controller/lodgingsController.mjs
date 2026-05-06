import { LodgingsService } from '../service/lodgingsService.mjs'

export class LodgingsController {
  static async getLodgings(req, res) {
    const { lat, lng, has } = req.query

    try {
      const lodgings = await LodgingsService.getLodgings(lat, lng, has)
      res.status(200).send(lodgings)
    } catch (error) {
      res.status(200).send({ erorr: error.message })
    }
  }
}
