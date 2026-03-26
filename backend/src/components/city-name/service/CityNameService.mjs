import { CityNameModel } from '../model/cityNameModel.mjs'

export class CityNameService {
  static async getCityNames(q) {
    const result = await CityNameModel.getCityNames(q)

    // transformar result a datos legibles.

    const cities = result.geonames.map((item) => {
      return {
        geonameId: item.geonameId,
        city_name: item.name,
        reg: item.adminName1,
        country: item.countryName
      }
    })

    return cities
  }
}
