import { PoisService } from '../components/poi_catalog/service/PoisService.mjs'
import { GeminiService } from './GeminiAPI.mjs'
import { UsersService } from '../components/users/service/UsersService.mjs'
import { TripsModel } from '../components/trips/model/TripsModel.mjs'
import { StopsService } from '../components/stops/service/StopsService.mjs'
import { OPService } from './OverpassAPI.mjs'

// this service involves using the POIS service (which searches on the DB to see if there are already existing POIS)
// Overpass API for getting new POIS using user's interest to insert them into the DB
// gemini API alongside the db for implementing RAG and creating stops for the itinerary
// creating the new trip on the DB with the associated stops
// retornar las stops correspondientes al viaje creado

export class TripPlan {
  static async create(tripData, userId) {
    // 1. Obtener intereses del usuario
    const userDetails = await UsersService.getInterests(userId)
    const userInterests = userDetails.interests
    const interestsList = userInterests.map((element) => {
      return element.interest_name
    })

    // 2. consultar el servicio de POI_Catalog para saber si existe lo que el user solicita
    let availablePois = await PoisService.getNearby(
      tripData.lng,
      tripData.lat,
      interestsList
    )

    // si no encuentra nada, consultar a Overpass API y guardar en POI_catalog
    if (!availablePois?.length) {
      const { lat, lng } = tripData
      // consulta la API overpass para tener POIS e introducirlos a la DB
      // eslint-disable-next-line no-unused-vars
      const dbResponse = await OPService.getPois(interestsList, lat, lng)

      // obtiene los datos recien guardados en la DB
      const poisResult = await PoisService.getNearby(lng, lat, interestsList)
      availablePois = poisResult
    }

    // 3. Enviar los pois al servicio de gemini para hacer la creación del intinerary
    const stopsByGemini = await GeminiService.createItinerary(
      availablePois,
      tripData
    )

    // 4. Crear el viaje para obtener el id del viaje
    const createdTrip = await TripsModel.create(tripData, userId)

    // 5. Hacer bulk de las stops en la DB
    // eslint-disable-next-line no-unused-vars
    const result = await StopsService.create(stopsByGemini, createdTrip)

    // 6. Obtener stops correspondientes al trip
    // this returns not only the stops but the already formatted object with the trip_id, trip_title and the related stops
    const stops = await StopsService.getStopsByTripId(createdTrip.id)

    console.log('Trip created successfully')

    return stops
  }
}
