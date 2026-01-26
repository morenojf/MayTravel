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
}
