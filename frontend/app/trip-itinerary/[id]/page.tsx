import ItineraryInfo from '@/app/ui/components/trip-itinerary/itinerary-info'
import Map from '@/app/ui/components/trip-itinerary/map'

// obtener detalles del viaje
import { getTripById } from '@/app/lib/api/trips'

// obtener detalles del viaje seleccionado

export default async function Itinerary({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const tripData = await getTripById(Number(id))

  return (
    <div className="flex flex-row h-screen">
      {/* Acordeon side */}
      <div className="relative basis-160 overflow-y-auto scrollbar-minimalist bg-white">
        <ItineraryInfo data={tripData} />
      </div>
      {/* Map side */}

      <Map data={tripData} />
    </div>
  )
}
