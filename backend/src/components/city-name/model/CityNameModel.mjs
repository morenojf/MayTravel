export class CityNameModel {
  static async getCityNames(q) {
    // fetch a geocode
    const QUERY = `http://api.geonames.org/searchJSON?name_startsWith=${q}&maxRows=10&style=LONG&lang=es&featureClass=P&username=${process.env.GEONAME_USERNAME}`

    const response = await fetch(QUERY, { method: 'GET' })
    const cities = await response.json()

    return cities
  }
}
