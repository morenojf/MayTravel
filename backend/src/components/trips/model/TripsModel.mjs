import { db } from '../../../databases/postgres-db/maytraveldb.mjs'

export class TripsModel {
  static async create({ title, lat, lng, arrive_date, leave_date }, userId) {
    const result = await db.query(
      'INSERT INTO trips (user_id, title, shelter, arrive_date, leave_date) VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326), $5, $6) RETURNING *',
      [userId, title, lng, lat, arrive_date, leave_date]
    )
    return result.rows[0]
  }

  static async getAll() {
    const result = await db.query('SELECT * FROM trips')
    return result.rows
  }

  static async getByUser(userId) {
    const result = await db.query(
      `
	    SELECT 
	  		users.id AS user_id, 
			users.username, 
			trips.id AS trip_id, 
			trips.title, 
			trips.shelter, 
			trips.arrive_date, 
			trips.leave_date 
		FROM users 
		LEFT JOIN trips ON users.id = trips.user_id 
		WHERE users.id = $1`,
      [userId]
    )
    return result.rows
  }

  static async delete(tripId) {
    const result = await db.query('DELETE FROM trips WHERE id = $1', [tripId])
    return result.rows
  }

  static async getById(id, userId) {
    const result = await db.query(
      `
		SELECT 
			trips.title, 
			ST_Y(shelter::geometry) AS shelter_lat,
			ST_X(shelter::geometry) AS shelter_lng,
			trips.arrive_date, 
			trips.leave_date, 
			poi_catalog.name AS spot_name, 
			poi_catalog.category AS spot_label, 
			poi_catalog.business_hours AS business_hours,
			ST_Y(poi::geometry) AS lat, 
            ST_X(poi::geometry) AS lng,
			stops.id AS stop_id, 
			stops.stop_order, 
			stops.arrival_time, 
			stops.departure_time 
		FROM trips 
		LEFT JOIN stops ON trips.id = stops.trip_id 
		LEFT JOIN poi_catalog ON stops.poi_catalog_id = poi_catalog.id 
		WHERE trips.id = $1 AND trips.user_id = $2
		ORDER BY stop_order ASC;`,
      [id, userId]
    )
    return result.rows
  }
}
