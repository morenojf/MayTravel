import { db } from '../../../databases/postgres-db/maytraveldb.mjs'

export class InterestsModel {
  static async getAll() {
    const result = await db.query('SELECT * FROM interests')
    return result.rows
  }

  static async create(name) {
    const result = await db.query('INSERT INTO interests(name) VALUES ($1)', [
      name
    ])
    return result.rows
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM interests WHERE id = $1', [id])
    return result.rows
  }

  static async update(name, id) {
    const result = await db.query(
      'UPDATE interests SET name = $1 WHERE id = $2;',
      [name, id]
    )
    return result.rows
  }


}
