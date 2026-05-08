import { PoisModel } from '../model/PoisModel.mjs'

export class PoisService {
  static async update(newData, id) {
    const objKeys = Object.keys(newData)
    if (objKeys.length === 0) return null

    const keyIndex = objKeys
      .map((key, index) => {
        return `${key} = $${index + 1}`
      })
      .join(', ')

    const values = objKeys.map((key) => newData[key])

    const idPosition = objKeys.length + 1
    values.push(id)

    const result = await PoisModel.update(keyIndex, values, idPosition)
    return result
  }

  static async getNearby(lng, lat, interestsList) {
    const RADIO = 5000
    // traducimos los intereses del usuario a las categorias que maneja la DB

    const posibleI = {
      Museums: 'museum',
      'Art Galleries': 'artwork',
      'Historical Sites': 'attraction',
      Castles: 'castle',
      Aquariums: 'aquarium',
      Zoos: 'park',
      Beaches: 'unknown',
      'Hiking Trails': 'unknown',
      Viewpoints: 'viewpoint',
      Parks: 'park',
      'Nature Reserves': 'nature_reserve',
      Mountains: 'unknown',
      'Thematic Parks': 'theme_park',
      Nightclubs: 'nightclub',
      Cinemas: 'cinema',
      'Shopping Malls': 'unknown',
      Conventions: 'unknown',
      Restaurants: 'restaurant',
      Cafes: 'cafe',
      Bars: 'bar',
      Pubs: 'pub',
      'Religious Sites': 'place_of_worship',
      Stadiums: 'stadium'
    }

    const categories = Object.keys(posibleI)
      .filter((key) => interestsList.includes(key))
      .map((key) => posibleI[key])

    // consultamos a la base de datos
    const result = await PoisModel.getNearby(lng, lat, categories, RADIO)

    return result
  }
}
