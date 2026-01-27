import { db } from '../../../databases/postgres-db/maytraveldb.mjs'

export class StopsModel {
  static async create({
    trip_id,
    poi_catalog_id,
    stop_order,
    arrival_time,
    departure_time
  }) {
    const result = await db.query(
      'INSERT INTO stops (trip_id, poi_catalog_id, stop_order, arrival_time, departure_time) VALUES ($1, $2, $3, $4, $5)',
      [trip_id, poi_catalog_id, stop_order, arrival_time, departure_time]
    )
    return result.rows
  }
}
