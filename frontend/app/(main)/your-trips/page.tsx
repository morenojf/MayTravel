import Link from 'next/link'
import TripCard from '@/app/ui/components/your-trips/trip-cards'
import { getTrips } from '@/app/lib/api/trips'
import { SingleTrip, userTrips } from '@/app/lib/interfaces/tripInterface'

export default async function TripGallery() {
  // 1. solicitar a la api los viajes del usuario logueado
  const userTrips: userTrips = await getTrips()

  // 2. si no tiene viajes motrar componente base

  if (!userTrips.trips || userTrips.trips.length === 0) {
    return (
      <div>
        <h1>
          Aún no tienes planes de viajes...
          <Link
            href="/create-trip"
            className="ml-2 text-sm font-bold text-orange-500"
          >
            Planificar un nuevo viaje.
          </Link>
        </h1>
      </div>
    )
  }
  // 3. si tienes viajes mostrar componente de tarjetas

  return (
    <div className="flex gap-1">
      {userTrips.trips.map((trip: SingleTrip) => (
        <TripCard
          key={trip.id}
          id={trip.id}
          title={trip.title}
          shelter={trip.shelter}
          arrd={trip.arrd}
          leavd={trip.leavd}
        />
      ))}
    </div>
  )
}
