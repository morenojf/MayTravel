//lodgings can be search by using the overpassAPI or PhotonAPI services.
// (photonAPI service highly recommended due to being faster)

// import { OPService } from '../../../services/OverpassAPI.mjs'
import { PhotonService as LodgingsProvider } from '../../../services/PhotonAPI.mjs'

export class LodgingsService {
  static async getLodgings(lat, lng, has) {
    const result = await LodgingsProvider.getLodgings(lat, lng, has)

    // const lodgings = result.map((item) => {
    //   return {
    //     lodging_name: item.tags.name,
    //     lodging_lat: item.type == 'node' ? item.lat : item.bounds.minlat,
    //     lodging_lng: item.type == 'node' ? item.lon : item.bounds.minlon
    //   }
    // })

    const lodgings = result.map((item) => {
      return {
        lodging_name: item.properties.name,
        lodging_locality:
          (item.properties.locality
            ? item.properties.locality
            : item.properties.district) ?? null,
        lodging_city: item.properties.city,
        lodging_country: item.properties.country,
        lodging_lat: item.geometry.coordinates[1],
        lodging_lng: item.geometry.coordinates[0]
      }
    })

    return lodgings
  }
}
