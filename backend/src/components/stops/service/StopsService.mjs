import { StopsModel } from '../model/StopsModel.mjs'

export class StopsService {
  static async create(stops, createdTrip) {
    const values = stops
      .map((element) => {
        return ` (${createdTrip.id}, ${element.poi_catalog_id}, ${element.stop_order}, '${element.arrival_time}', '${element.departure_time}')`
      })
      .join(',')
    const result = await StopsModel.create(values)
    return result
  }

  static async getStopsByTripId(tripId) {
    const result = await StopsModel.getByTripId(tripId)

    // 1. Mapeamos las paradas para que tengan el formato limpio
    const cleanStops = result.map((element) => ({
      orden: element.orden,
      site_name: element.site_name,
      category: element.category,
	  avrg_stay: element.estimated_time,
      llegada: element.llegada,
      salida: element.salida,
	  business_hr: element.horario,
      distancia: element.distancia_desde_anterior_km,
      lat: element.lat,
      lng: element.lng
    }))

    const tripInfo = {
      trip_id: result[0].trip_id,
      trip_title: result[0].title,
      stops: cleanStops
    }

    return tripInfo
  }
}
