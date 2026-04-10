'use client'

import { SingleTrip } from '@/app/lib/interfaces/tripInterface'
import { formatDate } from '@/app/lib/utils/formatDate'
import Image from 'next/image'

import { useRouter } from 'next/navigation'

export default function TripCard(tripInfo: SingleTrip) {
  const route = useRouter()

  function handleClick(tripInfo: SingleTrip) {
    route.push(`/trip-itinerary/${tripInfo.id}`)
  }

  return (
    // Contenedor principal de la tarjeta con borde de enfoque (púrpura) y sombra suave
    <div
      className="scale-80 flex-1  overflow-hidden rounded-xl border-2 border-transparent transition-all hover:border-orange-600 hover:shadow-lg focus:outline-none focus:ring-2"
      onClick={() => handleClick(tripInfo)}
    >
      {/* Contenedor de la Imagen con relación de aspecto (Ratio 3:2 aproximado) */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-t-lg bg-gray-100">
        <Image
          // Aquí usarías una URL de imagen dinámica. Por ahora, un placeholder.
          // src={trip.imageUrl || "/images/placeholder-trip.jpg"}
          src="/placeholder-trip.jpg" // Asegúrate de tener esta imagen en /public
          alt={`Imagen del viaje:`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="316px"
          priority={false}
        />
      </div>

      {/* Contenedor del Texto (Título y Fecha) con padding */}
      <div className="bg-white p-5">
        {/* Título del Viaje (e.g., 'Viaje a Mérida') */}
        <h3 className="mb-1.5 text-lg font-semibold text-gray-900 line-clamp-1">
          Viaje a {tripInfo.title}
        </h3>

        {/* Fechas del Viaje (e.g., 'Dic 12 - Ene 21') */}
        <p className="text-sm text-gray-600 font-medium">
          {/* Aquí formatearías tus fechas (arrd y leavd) */}
          {formatDate(tripInfo.arrd)} - {formatDate(tripInfo.leavd)}
        </p>
      </div>
    </div>
  )
}
