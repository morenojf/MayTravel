'use client'

import InputField from '../common/input-field'
import Link from 'next/link'

export default function CreateTripForm() {
  return (
    <div className="flex justify-center scale-85 origin-top">
      <form className="p-8 w-130">
        <InputField
          label="Lugar"
          type="text"
          id="place"
          placeholder="¿A dónde vas?"
          errorMessage="Por favor, ingresa una ubicación"
        />

        <InputField
          label="Hospedaje"
          type="password"
          id="password"
          placeholder="¿Dónde te quedas?"
          errorMessage="Por favor, ingresa una ubicación"
        />

        {/* contenedor de fechas */}
        <div className="flex flex-row gap-4">
          <div className="flex-1">
            <InputField
              label="Fecha de llegada"
              type="date"
              id="arriva_date"
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

        <Link href="/dashboard">
          <button
            type="submit"
            className="text-sm w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors"
          >
            Crear Viaje
          </button>
        </Link>
      </form>
    </div>
  )
}
