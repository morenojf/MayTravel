'use client'
import { useState, useEffect, useRef } from 'react'

// usar Debounce para hacer peticiones con retraso al backend y obtenr las sugerencias de autocompletado
// En React, esto se logra combinando useState y useEffect con un setTimeout.

interface InputFieldProps {
  label: string
  type?: string
  id: string
  placeholder?: string
  errorMessage: string
}

interface CityResults {
  geonameId: number
  city_name: string
  reg: string
  country: string
}

// Ajusta las props según lo que ya le estás pasando desde form.tsx
export default function SearchCityInput({
  label,
  id,
  placeholder
}: InputFieldProps) {
  const [inputValue, setInputValue] = useState('')
  const [results, setResults] = useState<CityResults[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showList, setShowList] = useState(false) // Control de visibilidad

  const containerRef = useRef<HTMLDivElement>(null) // Referencia para detectar clic fuera

  // 1. Cerrar al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowList(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 2. Cerrar al hacer clic fuera del contenedor
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowList(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Lógica del Debounce (tu useEffect anterior)
  useEffect(() => {
    if (inputValue.trim() === '') {
      setResults([])
      setShowList(false)
      return
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true)
      try {
        const response = await fetch(
          `http://localhost:4000/city-name/${inputValue}`
        )
        if (response.ok) {
          const data = await response.json()
          setResults(data)
          setShowList(data.length > 0) // Mostramos la lista solo si hay resultados
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [inputValue])

  // 3. Manejar la selección del elemento
  const handleSelect = (city: CityResults) => {
    // Seteamos el valor con el formato que pediste
    const fullLocation = `${city.city_name}, ${city.reg}, ${city.country}`
    setInputValue(fullLocation)
    setShowList(false) // Cerramos la lista inmediatamente
  }

  return (
    <div ref={containerRef} className="relative flex flex-col gap-2">
      <label htmlFor={id} className="mb-1 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={id}
        autoComplete="off" // Evita que el navegador tape tus sugerencias
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => inputValue.length > 0 && setShowList(true)}
        className="border p-2 rounded text-black"
      />

      {isSearching && (
        <span className="text-xs text-gray-400">Buscando...</span>
      )}

      {/* Lista Estilizada en Blanco (Modo Claro) */}
      {showList && results.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl mt-2 z-50 overflow-hidden">
          {results.map((city) => (
            <li
              key={city.geonameId}
              onClick={() => handleSelect(city)}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-none group text-left"
            >
              <div className="flex flex-col">
                <span className="text-gray-900 font-semibold group-hover:text-orange-500 transition-colors">
                  {city.city_name}
                </span>
                <span className="text-sm text-gray-500">
                  {city.reg}, {city.country}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
