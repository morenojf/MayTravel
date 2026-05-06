'use client'

import citySearcher from '@/app/lib/api/citySearcher'
import { useEffect, useRef, useState, useTransition } from 'react'

// main interface for the input
interface SearchCityInputProps {
  label: string
  type: string
  id: string
  placeholder: string
  errorMessage: string
  onCitySelect: (lat: string, lng: string) => void // esto funciona para darle valores (lat, lng) y pasarlos al padre
}

// interface for the city item on the cities List
interface cityItem {
  city_name: string
  country: string
  geonameId: number
  lat: string
  lng: string
  reg: string
}

export default function SearchCityInput({
  label,
  type,
  id,
  placeholder,
  errorMessage,
  onCitySelect
}: SearchCityInputProps) {
  const [inputValue, setInputValue] = useState('') // modificar valor del input (es como la ram de mi componente)
  //        ↑              ↑              ↑
  //   el valor     el botón      valor inicial (vacío)

  const [citiesList, setCitiesList] = useState<cityItem[]>([]) // modificar el array de la lista de ciudades de la busqueda (inicia en array vacio)
  const [showList, setShowList] = useState(false) // mostrar lista (true), no mostrar lista (false)

  // permitir que se cierre la lista de sugerencias y se vacie la lista de sugerencias sin hacerlo de forma urgente
  const [isPending, startTransition] = useTransition()

  // mostrar error cuando el campo no se ha llenado
  const [isRequired, setIsRequired] = useState(true)
  // referencia
  const containerRef = useRef<HTMLDivElement>(null)

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

  // deteccion de cambio del manual del input por el usuario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)

    // Si el usuario esta borrando o modificando la ciudad seleccionada, reactivamos la busqueda
    if (isRequired === false) {
      setIsRequired(true)
    }
  }

  // modificar el  valor del inputValue segun lo que introduce el usuario
  useEffect(() => {
    // esto se ejecuta despues de que react pinta la pantalla
    if (inputValue === '') {
      startTransition(() => {
        setCitiesList([])
        setShowList(false)
        setIsRequired(true)
      })
      return
    }

    const timer = setTimeout(async () => {
      if (isRequired === false) return
      const cities = await citySearcher(inputValue)
      setCitiesList(cities)
      setShowList(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [inputValue, isRequired]) // ← Dependencia: se ejecuta cuando inputValue cambia

  // funcion para manejar la ciudad seleccionada
  function handleSelect(element: cityItem) {
    setShowList(false)
    setInputValue(`${element.city_name}, ${element.reg}, ${element.country}`)
    onCitySelect(element.lat, element.lng)
    setIsRequired(false)
    return
  }

  return (
    <div className="relative flex flex-col " ref={containerRef}>
      <label>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="border p-2 rounded text-black mt-2"
        value={inputValue}
        onChange={handleInputChange}
      />
      {isRequired && (
        <span className=" text-sm text-red-500">{errorMessage}</span>
      )}

      {citiesList?.length > 0 && showList && (
        <ul className="absolute top-full w-full bg-white border border-gray-500 rounded-xl shadow-xl mt-2 z-50">
          {citiesList?.map((element) => (
            <li
              key={element.geonameId}
              className="p-2 hover:bg-gray-200  hover:rounded-xl cursor-pointer"
              onClick={() => {
                handleSelect(element)
              }}
            >
              <div>
                <b>
                  <p>{element.city_name}</p>
                </b>
                <p className="text-slate-600">
                  {element.reg}, {element.country}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {citiesList?.length <= 0 && showList && (
        <ul className="absolute top-full w-full bg-white border border-gray-500 rounded-xl shadow-xl mt-2 z-50">
          <li
            key={null}
            className="p-2 hover:bg-gray-200  hover:rounded-xl cursor-pointer"
          >
            <div>
              <p>Sin resultados para esta ciudad</p>
            </div>
          </li>
        </ul>
      )}
    </div>
  )
}
