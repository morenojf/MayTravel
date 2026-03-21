import { db } from '../../../databases/postgres-db/maytraveldb.mjs'

export class PoisModel {
  static async getAll() {
    const result = await db.query('SELECT * FROM poi_catalog')
    return result.rows
  }

  static async create(values) {
    const result = await db.query(
      `INSERT INTO poi_catalog (id, name, address, poi, category, business_hours, average_stay_minutes) VALUES ${values.join(',')} 
	  ON CONFLICT (id) 
	  DO UPDATE SET 
	  (name, address, poi, category, business_hours, average_stay_minutes) = 
	  (EXCLUDED.name, EXCLUDED.address, EXCLUDED.poi, EXCLUDED.category, EXCLUDED.business_hours, EXCLUDED.average_stay_minutes);`
    )
    return result.rows
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM poi_catalog WHERE id = $1', [id])
    return result.rows
  }

  static async update(keyIndex, values, idPosition) {
    console.log()
    const result = db.query(
      `UPDATE poi_catalog SET ${keyIndex} WHERE id = $${idPosition}`,
      values
    )
    return result.rows
  }

  static async getNearby(lng, lat, categories, radio) {
    const result = await db.query(
      `
        SELECT 
            id, name, address, category, business_hours, average_stay_minutes,
            ST_X(poi::geometry) AS lng, 
            ST_Y(poi::geometry) AS lat,
            ST_Distance(poi, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography) AS distance
        FROM poi_catalog
        WHERE category = ANY($3)
          AND ST_DWithin(poi, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $4)
          AND last_updated >= NOW() - INTERVAL '6 months'
        ORDER BY distance ASC;
    `,
      [lng, lat, categories, radio]
    )
    return result.rows
  }
}
