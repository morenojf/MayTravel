'use client'
import { useState, useEffect, useRef, useTransition } from 'react'
import MapModal from '../common/map-modal'
import lodgingSearcher from '@/app/lib/api/lodgingSearcher'
import { LodgingResult } from '@/app/lib/interfaces/lodgings'

// main interface
interface InputFieldProps {
  label: string
  type: string
  id: string
  placeholder?: string
  errorMessage: string
  coords?: { lat: string; lng: string } // Coordenadas de la ciudad
  onLodgingSelect: (lat: number, lng: number) => void
}

export default function LodgingInput({
  label,
  type,
  id,
  placeholder,
  errorMessage,
  coords,
  onLodgingSelect
}: InputFieldProps) {
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<LodgingResult[]>([])

  // transition for no urgent functions
  const [isPending, startTransition] = useTransition()

  // errorMessage required validation
  const [isRequired, setIsRequired] = useState(true)

  // Coordenadas finales seleccionadas por el usuario
  const [finalLodgingCoords, setFinalLodgingCoords] = useState<{
    lat: number
    lng: number
  } | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  // funcion consulta de lodgings (similar a citySearcher)
  useEffect(() => {
    // Solo buscamos si el input value no esta vacio y existen coordenadas seleccionadas
    if (inputValue === '' || !coords?.lat) {
      startTransition(() => {
        setSuggestions([])
      })
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      // armamos URL params
      const params = new URLSearchParams({
        lat: coords.lat.toString(),
        lng: coords.lng.toString(),
        has: inputValue
      })

      const data = await lodgingSearcher(
        params.toString(),
        coords.lat,
        coords.lng
      )
      setSuggestions(data)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [inputValue, coords])

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

  // Cerrar haciendo click en key escape

  // Lo que se renderizará en la columna izquierda del modal
  const sidebarContent = (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Ej. Hotel, Posada, Hostal..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5EA4CB]"
      />

      {suggestions?.length > 0 && (
        <ul className="flex flex-col gap-2">
          {suggestions.map((place, index) => (
            <li
              key={index} // Idealmente usa un ID único si lo tienes, sino el index
              onClick={() => {
                setFinalLodgingCoords({
                  lat: place.lodging_lat,
                  lng: place.lodging_lng
                })
                onLodgingSelect(place.lodging_lat, place.lodging_lng)
                setIsRequired(false)
              }}
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
      )}

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
      <label htmlFor={id} className="mt-3">
        {label}
      </label>

      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
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
        className="border p-2 rounded text-black mt-2"
      />

      {isRequired && (
        <span className=" text-sm text-red-500">{errorMessage}</span>
      )}

      {isMapOpen && coords?.lat && (
        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          coords={{ lat: parseFloat(coords.lat), lng: parseFloat(coords.lng) }}
          sidebarContent={sidebarContent}
          selectedLocation={finalLodgingCoords}
          onSelectCoordinates={(lat, lng) => {
            setFinalLodgingCoords({ lat, lng })
            onLodgingSelect(lat, lng)
            setIsRequired(false)
          }}
        />
      )}
    </div>
  )
}
