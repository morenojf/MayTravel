'use client'
import { useState, useEffect, useRef } from 'react'
import MapModal from './map-modal'

// 1. NUEVA ESTRUCTURA BASADA EN TU IMAGEN DEL BACKEND
interface LodgingResult {
  lodging_name: string
  lodging_locality: string
  lodging_city: string
  lodging_country: string
  lodging_lat: number
  lodging_lng: number
}

interface InputFieldProps {
  label: string
  type: string
  id: string
  placeholder?: string
  errorMessage: string
  coords?: { lat: string; lng: string } // Coordenadas de la ciudad
}

export default function LodgingInput({
  label,
  type,
  id,
  placeholder,
  errorMessage,
  coords
}: InputFieldProps) {
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<LodgingResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // ESTE ES EL ESTADO CRÍTICO
  const [finalLodgingCoords, setFinalLodgingCoords] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  // 2. EL VERDADERO DEBOUNCE (Igual que en tu SearchCityInput)
  useEffect(() => {
    // Solo buscamos si hay más de 3 letras y tenemos la latitud de la ciudad
    if (searchQuery.trim().length < 3 || !coords?.lat) {
      setSuggestions([])
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true)
      try {
        // Armamos la URL limpia usando URLSearchParams
        const params = new URLSearchParams({
          lat: coords.lat.toString(),
          lng: coords.lng.toString(),
          has: searchQuery
        })
        console.log(`http://localhost:4000/lodging-names?${params}`)

        const res = await fetch(`http://localhost:4000/lodging-names?${params}`)

        if (res.ok) {
          const data = await res.json()
          setSuggestions(data) // Guardamos el array de resultados
        }
      } catch (error) {
        console.error('Error buscando hoteles:', error)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    // Limpiamos el timeout si el usuario sigue escribiendo antes de los 300ms
    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery, coords])

  // Cerrar haciendo clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsMapOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Lo que se renderizará en la columna izquierda del modal
  const sidebarContent = (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Ej. Hotel, Posada, Hostal..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5EA4CB]"
      />

      {isSearching && (
        <span className="text-xs text-gray-400">Buscando...</span>
      )}

      <ul className="flex flex-col gap-2">
        {!isSearching &&
          suggestions.length === 0 &&
          searchQuery.length >= 3 && (
            <p className="text-xs text-gray-500">
              No se encontraron resultados cerca.
            </p>
          )}

        {/* 3. MAPEO USANDO LOS DATOS REALES DE TU API */}
        {suggestions.map((place, index) => (
          <li
            key={index} // Idealmente usa un ID único si lo tienes, sino el index
            onClick={() =>
              setFinalLodgingCoords({
                lat: place.lodging_lat,
                lng: place.lodging_lng
              })
            }
            className="p-2 border border-gray-100 rounded hover:bg-orange-50 cursor-pointer text-sm"
          >
            <p className="font-bold text-gray-800 line-clamp-1">
              {place.lodging_name}
            </p>
            <p className="text-xs text-gray-500 line-clamp-2">
              {place.lodging_city}, {place.lodging_country}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-400">
          O haz clic directamente en cualquier lugar del mapa para fijar tu
          hospedaje.
        </p>
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="flex flex-col mb-4 relative">
      <label
        htmlFor={id}
        className="mb-1 mt-3 text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required
        autoComplete="off"
        value={
          finalLodgingCoords
            ? `Coordenadas: ${finalLodgingCoords.lat.toFixed(4)}, ${finalLodgingCoords.lng.toFixed(4)}`
            : ''
        }
        readOnly
        onClick={() => {
          if (coords?.lat) setIsMapOpen(true)
        }}
        className="peer px-4 py-2 border border-gray-300 rounded-lg text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5EA4CB]"
      />

      {isMapOpen && coords?.lat && (
        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          coords={{ lat: parseFloat(coords.lat), lng: parseFloat(coords.lng) }}
          sidebarContent={sidebarContent}
          selectedLocation={finalLodgingCoords}
          onSelectCoordinates={(lat, lng) => {
            setFinalLodgingCoords({ lat, lng })
            console.log('Coordenadas finales:', lat, lng)
          }}
        />
      )}
    </div>
  )
}
