import { UsersModel } from '../model/UsersModel.mjs'

export class UsersService {
  static async auth(identifier, password) {
    const user = await UsersModel.getUserByIdentifier(identifier)
    if (!user.length || user[0]?.password != password) return null

    if (user[0]?.password === password) {
      // pasamos solo la informacion minima requerida sin la contrasenia para generar el token
      const userData = {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        role: user[0].role
      }

      return userData
    }
  }

  static async editInfo(id, newInfo) {
    const userFound = await UsersModel.getById(id)
    if (!userFound.length) return null

    return await UsersModel.updateUser(id, newInfo)
  }

  static async getInterests(userId) {
    // hacemos la consulta a la DB
    const result = await UsersModel.getInterests(userId)
    // si la consulta regresa vacia retornamos
    if (result.length === 0) return result

    // reducimos el array de objetos a solo los datos que se repiten del usuario
    const { id, username, email } = result.reduce((element) => element)
    // mapeamos los datos que no se repiten del array original (result)
    const interests = result.map((element) => ({
      interest_id: element.interest_id,
      interest_name: element.interest_name
    }))
    // integramos los datos reducidos y los mapeados
    return { user_id: id, username, email, interests: interests }
  }
}
