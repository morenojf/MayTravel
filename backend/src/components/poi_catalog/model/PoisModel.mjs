import { db } from '../../../databases/postgres-db/maytraveldb.mjs'

export class PoisModel {
  static async getAll() {
    const result = await db.query('SELECT * FROM poi_catalog')
    return result.rows
  }

  static async create({
    name,
    address,
    lat,
    lng,
    category,
    open_time,
    close_time,
    average_stay_minutes
  }) {
    const result = await db.query(
      'INSERT INTO poi_catalog (name, address, poi, category, open_time, close_time, average_stay_minutes) VALUES($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326), $5, $6, $7, $8)',
      [
        name,
        address,
        lat,
        lng,
        category,
        open_time,
        close_time,
        average_stay_minutes
      ]
    )
    return result.rows
  }

  static async delete(id){
	const result = await db.query("DELETE FROM poi_catalog WHERE id = $1", [id])
	return result.rows
  }

  static async update(keyIndex, values, idPosition){
	console.log()
	const result = db.query(`UPDATE poi_catalog SET ${keyIndex} WHERE id = $${idPosition}`, values)
	return result.rows
  }
}
