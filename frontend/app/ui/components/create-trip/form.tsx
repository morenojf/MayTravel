'use client'

import { useState } from 'react'

import SearchCityInput from '../common/search-city-input'
import LodgingInput from '../common/input-lodging'
import InputField from '../common/input-field'
import { createTrip } from '@/app/lib/API'
import Link from 'next/link'

export default function CreateTripForm() {
  // Aquí guardamos las coordenadas de la ciudad elegida
  const [coords, setCoords] = useState({ lat: '', lng: '' })
  const handleCityCoords = (lat: string, lng: string) => {
    setCoords({ lat, lng })
  }

  async function handleSubmit(formData: FormData) {
    // transformacion de fechas de string a ISO 8601

    // este obj se va al backend.
    const tripData = {
      title: String(formData.get('place')), // Nombre de la ciudad
      lat: Number(coords.lat), // lat del hospedaje
      lng: Number(coords.lng), // lng del hospedaje
      arrive_date: new Date(
        formData.get('arrive_date') as string
      ).toISOString(), // fecha de llegada
      leave_date: new Date(formData.get('leave_date') as string).toISOString() // fecha de salida
    }

    // solicitud al backend para crear el viaje, se pasa el id del user como param.
    // el endpoint es trips porque en el backend la ruta es /users/:userId/trips
    // trip data es el obj que se va al backend con toda la info del viaje
    const request = await createTrip(1, 'trips', tripData)
    console.log(request)
  }

  return (
    <div className="flex justify-center scale-85 origin-top">
      <form className="p-8 w-130" action={handleSubmit}>
        {/* Ciudad */}
        <SearchCityInput
          label="Lugar"
          type="text"
          id="place"
          placeholder="¿A dónde vas?"
          errorMessage="Por favor, ingresa una ubicación"
          onCitySelect={handleCityCoords} // Pasamos la función aquí
        />

        {/* Hospedaje */}
        <LodgingInput
          label="Hospedaje"
          type="text"
          id="home"
          placeholder="¿Dónde te quedas?"
          errorMessage="Por favor, ingresa una ubicación"
          coords={coords} // <--- Pasamos el estado del padre al hijo
        />

        {/* contenedor de fechas */}
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <InputField
              label="Fecha de llegada"
              type="date"
              id="arrive_date"
              errorMessage="Por favor, ingresa una fecha de llegada"
            />
          </div>
          <div className="flex-1">
            <InputField
              label="Fecha de salida"
              type="date"
              id="leave_date"
              errorMessage="Por favor, ingresa una fecha de salida"
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-sm w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors"
        >
          Crear Viaje
        </button>

        {/* <Link href="/trip-itinerary">
        </Link> */}
      </form>
    </div>
  )
}
