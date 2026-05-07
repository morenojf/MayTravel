'use client'

import { useState } from 'react'

import SearchCityInput from './search-city-input'
import LodgingInput from './input-lodging'
import InputField from '../common/input-field'
import { createTrip } from '@/app/lib/api/createTrip'
import { useRouter } from 'next/navigation'
import compareDates from '@/app/lib/utils/compareDates'

export default function CreateTripForm() {
  // Aquí guardamos las coordenadas de la ciudad elegida
  const [coords, setCoords] = useState({ lat: '', lng: '' })
  const handleCityCoords = (lat: string, lng: string) => {
    setCoords({ lat, lng })
  }

  const [lodgingCoords, setLodgingCoords] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const handleLodgingCoords = (lat: number, lng: number) => {
    setLodgingCoords({ lat, lng })
  }

  // router import
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const arrDate = new Date(
      formData.get('arrive_date') as string
    ).toISOString()
    const leaveDate = new Date(
      formData.get('leave_date') as string
    ).toISOString()

    const dateCmprResult = compareDates(arrDate, leaveDate)

    if (!dateCmprResult) {
      alert('La fecha de llegada no puede ser posterior a la fecha de partida')
    }

    // este obj se va al backend.
    const tripData = {
      title: formData.get('place'), // Nombre de la ciudad
      lat: lodgingCoords?.lat, // lat del hospedaje
      lng: lodgingCoords?.lng, // lng del hospedaje
      arrive_date: arrDate, // fecha de llegada
      leave_date: leaveDate // fecha de salida
    }

    console.log(tripData)

    // const itineraryData = await createTrip(tripData)

    // redirigimos a la nueva screen pasando el id del trip para volver a consultar a la API.
    // router.push(`/trip-itinerary/${itineraryData?.trip_id}`)
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
          errorMessage="Debes seleccionar una ubicación"
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
          onLodgingSelect={handleLodgingCoords}
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
      </form>
    </div>
  )
}
