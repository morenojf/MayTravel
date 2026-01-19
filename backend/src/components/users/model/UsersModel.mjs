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

  static async create({ username, password, email, role = 'user' }) {
    const result = await db.query(
      'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4)',
      [username.toLowerCase(), password, email.toLowerCase(), role]
    )
    return result
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1', [id])
    return result.rows
  }

  static async updateUser(id, newInfo) {
    const { username, password, email } = newInfo
    const result = await db.query(
      'UPDATE users SET username = $1, password = $2, email = $3 WHERE id = $4',
      [username.toLowerCase(), password, email.toLowerCase(), id]
    )
    return result
  }

  static async getUserByIdentifier(identifier) {
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [identifier.toLowerCase()]
    )
    return result.rows
  }

  static async getInterests(id){
	const result = await db.query('SELECT users.id, users.username, users.email, interests.name AS interest_name,interests.id AS interest_id FROM users LEFT JOIN users_interests ON users.id = users_interests.user_id LEFT JOIN interests ON users_interests.interest_id = interests.id WHERE users.id = $1', [id])
	return result.rows
  }

  static async addInterests(userId, interest) {
    // dibuja dinamicamente los valores que serán ingresados manteniendo el mismo userId
    // cambiando los id de los intereses.
    const values = interest.map((element) => {
      return `(${userId}, ${element})`
    })

    const result = await db.query(
      `INSERT INTO users_interests (user_id, interest_id) VALUES ${values.join(',')}`
    )
    return result.rows
  }
}
