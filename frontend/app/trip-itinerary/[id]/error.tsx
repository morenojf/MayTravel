'use client' // Error components deben ser Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Aquí puedes loguear el error a un servicio como Sentry
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
      <h2 className="text-2xl font-bold text-red-600">¡Algo salió mal! 😭</h2>
      <p className="text-gray-600 my-4">
        No pudimos cargar la información del viaje.
      </p>
      <button
        onClick={() => reset()} // Intenta renderizar el componente de nuevo
        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
      >
        Reintentar
      </button>
    </div>
  )
}
