import { db } from '../../../databases/postgres-db/maytraveldb.mjs'

export class StopsModel {
  static async create(values) {
    const result = await db.query(
      `INSERT INTO stops (trip_id, poi_catalog_id, stop_order, arrival_time, departure_time) VALUES ${values}`
    )
    return result.rows
  }

  static async getByTripId(tripId) {
    const result = await db.query(
      `
SELECT
    trips.id as trip_id,
    trips.title,
    poi_catalog.category AS category,
    poi_catalog.name AS site_name,
    poi_catalog.address AS direccion,
    ST_X(poi_catalog.poi::geometry) AS lng, 
    ST_Y(poi_catalog.poi::geometry) AS lat,
    poi_catalog.business_hours AS horario,
    poi_catalog.average_stay_minutes AS tiempo_estimado,
    stops.id AS stop_id,
    stops.stop_order AS orden,
    stops.arrival_time AS llegada,
    stops.departure_time AS salida,
    -- CÁLCULO INTELIGENTE DE DISTANCIA
    ROUND(
        (ST_Distance(
            poi_catalog.poi::geography, 
            CASE 
                WHEN stops.stop_order = 1 THEN trips.shelter::geography 
                ELSE LAG(poi_catalog.poi::geography) OVER (ORDER BY stops.arrival_time, stops.stop_order)
            END
        ) / 1000)::numeric, 
        2
    ) AS distancia_desde_anterior_km
FROM trips
LEFT JOIN stops ON trips.id = stops.trip_id
LEFT JOIN poi_catalog ON stops.poi_catalog_id = poi_catalog.id
WHERE trips.id = $1
ORDER BY stops.arrival_time ASC, stops.stop_order ASC;`,
      [tripId]
    )
    return result.rows
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM stops WHERE id = $1', [id])
    return result.rows
  }
}
