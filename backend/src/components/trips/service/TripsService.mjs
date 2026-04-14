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

  static async getById(id, userId) {
    const result = await TripsModel.getById(id, userId)
    if (!result || result.length === 0) return result

    const {
      title,
      shelter,
      arrive_date,
      leave_date,
      shelter_lng,
      shelter_lat
    } = result[0]

    const simplified = {
      title,
      shelter,
      shelter_lat,
      shelter_lng,
      arrive_date,
      leave_date,
      stops: result.map((element) => ({
        id: element.stop_id,
        name: element.spot_name,
        category: element.spot_label,
        order: element.stop_order,
        coming: element.arrival_time,
        leaving: element.departure_time,
        business_hours: element.business_hours,
        lat: element.lat,
        lng: element.lng
      }))
    }

    const stops = simplified.stops

    const groupedStops = stops.reduce((acc, element) => {
      const dateKey = new Date(element.coming).toISOString().split('T')[0]

      if (!acc[dateKey]) {
        acc[dateKey] = []
      }

      acc[dateKey].push({
        id: element.id,
        name: element.name,
        category: element.category,
        oder: element.oder,
        coming: element.coming,
        leaving: element.leaving,
        business_hours: element.business_hours,
        lat: element.lat,
        lng: element.lng
      })

      acc[dateKey].sort((a, b) => a.order - b.order)

      return acc
    }, {})

    return {
      title,
      shelter_lat,
      shelter_lng,
      arrive_date,
      leave_date,
      itinerary: groupedStops
    }
  }
}
