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
        levd: element.leave_date
      }))
    }
    
	return simplified
  }
}
