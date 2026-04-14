'use client'

import dynamic from 'next/dynamic'
import { DetailedTrip } from '@/app/lib/interfaces/tripInterface'
import { formatOpeningHours } from '@/app/lib/utils/formatDate_time'
import { formatTime } from '@/app/lib/utils/formatDate_time'
import { categoryTranslations } from '@/app/lib/utils/translateCategory'

// importacion de iconos de leaflet
import { useEffect, useState } from 'react'
import type { Icon, LatLngBoundsExpression } from 'leaflet' // tipo de dato para el useState

// Cargamos los componentes estrictamente de forma dinámica
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false
})

export default function Map({ data }: { data: DetailedTrip }) {
  // Coordenadas de origen para centrar el mapa
  const shelter_lat = data.shelter_lat
  const shelter_lng = data.shelter_lng

  // importacion del icono de leaflet para los markers
  const [icon, setIcon] = useState<Icon | null>(null)
  useEffect(() => {
    // Importamos Leaflet de forma asíncrona solo en el cliente
    const initLeaflet = async () => {
      const L = (await import('leaflet')).default

      // Configuramos el icono por defecto manualmente para evitar rutas rotas
      const defaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      })

      setIcon(defaultIcon)
    }

    initLeaflet()
  }, [])

  // lista plana de todos los stops  [{stop}, {stop}, ...]
  const allStops = Object.values(data.itinerary).flat()

  // Creacion del bound para triangular todsas las coords y que sean visibles en el zoom del map
  // Bounds (limites)
  // Lista plana de todas las coords de los stops en pares [[lat, lng], [lat, lng]]
  const coords: LatLngBoundsExpression = allStops.map((element) => [
    element.lat,
    element.lng
  ])

  const bounds: LatLngBoundsExpression | undefined =
    coords.length > 0 ? (coords as LatLngBoundsExpression) : undefined

  return (
    <div className="h-screen w-full">
      <MapContainer
        bounds={bounds}
        center={[shelter_lat, shelter_lng]}
        zoom={14}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {icon &&
          allStops.map((element) => (
            <Marker
              key={element.id}
              position={[element.lat, element.lng]}
              icon={icon}
            >
              <Popup>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-sm">{element.name}</h3>
                  <span className="text-xs text-blue-600 font-semibold">
                    {categoryTranslations(element.category)}
                  </span>
                  <p className="text-xs text-slate-500 italic">
                    <b>Abierto: </b>
                    {formatOpeningHours(element.business_hours)}
                  </p>
                  <div className="mt-1 pt-1 border-t border-slate-100 text-[10px]">
                    <strong>Horario de estadía:</strong>{' '}
                    {formatTime(element.coming)} - {formatTime(element.leaving)}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  )
}
