import { db } from '../../../databases/postgres-db/maytraveldb.mjs'

export class UsersModel {
  static async getAll() {
    const result = await db.query('SELECT * FROM users')
    return result.rows
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows
  }

  static async create(newUser) {
    const result = await db.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)',
      [newUser.username, newUser.password, newUser.email]
    )
    return result
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1', [id])
    return result.rows
  }

  static async updateUser(id, newInfo) {
	const {username, password, email} = newInfo
    const result = await db.query(
      'UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4',
      [username, password, email, id]
    )
    return result
  }
}
