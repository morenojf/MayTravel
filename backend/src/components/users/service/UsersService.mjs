import { UsersModel } from '../model/UsersModel.mjs'

export class UsersService {
  static async editInfo(id, newInfo) {
    const userFound = await UsersModel.getById(id)
    if (!userFound.length) return null

	return await UsersModel.updateUser(id, newInfo)

  }
}
