import { TripsModel } from '../model/TripsModel.mjs'

export class TripsService {
  static async getByUser(userId) {
    const result = await TripsModel.getByUser(userId)

    if (!result || result.length === 0) return result

    const { user_id, username } = result[0]
    const simplified = {
      user_id,
      username,
      trips: result.map((element) => ({
        id: element.trip_id,
        title: element.title,
        shelter: element.shelter,
        arrd: element.arrive_date,
        leavd: element.leave_date
      }))
    }

    return simplified
  }

  static async getById(id) {
    const result = await TripsModel.getById(id)
    if (!result || result.length === 0) return result

    const { title, shelter, arrive_date, leave_date } = result[0]
    const simplified = {
      title,
      shelter,
      arrive_date,
      leave_date,
      stops: result.map((element) => ({
        id: element.stop_id,
        name: element.spot_name,
        category: element.spot_label,
        order: element.stop_order,
        coming: element.arrival_time,
        leaving: element.departure_time
      }))
    }

    return simplified
  }
}
