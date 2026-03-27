import { GNService } from '../../../services/GeonamesAPI.mjs'

export class CityNameService {
  static async getCityNames(q) {
    const result = await GNService.getCities(q)

    // transformar result a datos legibles.

    const cities = result.geonames.map((item) => {
      return {
        geonameId: item.geonameId,
        city_name: item.name,
        reg: item.adminName1,
        country: item.countryName,
        lat: item.lat,
        lng: item.lng
      }
    })

    return cities
  }
}
