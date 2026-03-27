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
      'Dance hall': 'nightclub',
      'Thematic Park': 'park',
      Gamescon: 'conventions',
      Restaurant: 'restaurant'
    }

    const categories = Object.keys(posibleI)
      .filter((key) => interestsList.includes(key))
      .map((key) => posibleI[key])

    // consultamos a la base de datos
    const result = await PoisModel.getNearby(lng, lat, categories, RADIO)
    return result
  }
}
