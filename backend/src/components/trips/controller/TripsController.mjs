// servicio global para creación de viajes
import { TripPlan } from '../../../services/TripPlanOrchestrator.mjs'

import { TripsModel } from '../model/TripsModel.mjs'
import { TripsService } from '../service/TripsService.mjs'

export class TripsController {
  static async create(req, res) {
    try {
      const userId = req.userId
      // shelter es de tipo POINT
      const tripData = req.body
      const result = await TripPlan.create(tripData, userId)
      res.status(200).send(result)
    } catch (error) {
      console.error({
        message: 'Fallo en orquestador',
        error: error.message || error
      })

      res.status(500).send({ error: error.message })
    }
  }

  static async getAll(req, res) {
    try {
      const result = await TripsModel.getAll()
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  static async getByUser(req, res) {
    try {
      const userId = req.userId
      const result = await TripsService.getByUser(userId)
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  static async delete(req, res) {
    try {
      const tripId = req.params.id
      // eslint-disable-next-line no-unused-vars
      const result = await TripsModel.delete(tripId)
      res.status(200).send({ message: 'Trip Deleted Succesfully' })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  static async getById(req, res) {
    try {
      const id = req.params.id
      const result = await TripsService.getById(id)
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }
}
