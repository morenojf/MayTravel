'use client'

import { SingleTrip } from '@/app/lib/interfaces/tripInterface'
import { formatDate } from '@/app/lib/utils/formatDate_time'
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
      className="flex flex-col rounded-xl border-2 border-transparent bg-white shadow-sm transition-all hover:border-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 cursor-pointer overflow-hidden"
      onClick={() => handleClick(tripInfo)}
    >
      {/* CAMBIO AQUÍ: En lugar de h-full, usamos aspect-video (proporción 16:9) o h-48 para la imagen */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 sm:aspect-video">
        <Image
          src="/placeholder-trip.jpg"
          alt={`Imagen del viaje: ${tripInfo.title}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          // Optimización de carga de imagen en base al grid
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          priority={false}
        />
      </div>

      {/* Contenedor del Texto */}
      <div className="p-4 flex flex-col justify-center">
        <h3 className="mb-1 text-lg font-semibold text-gray-900 line-clamp-1">
          Viaje a {tripInfo.title}
        </h3>

        <p className="text-sm font-medium text-gray-600">
          {formatDate(tripInfo.arrd)} - {formatDate(tripInfo.leavd)}
        </p>
      </div>
    </div>
  )
}
