'use client'

import Link from 'next/link'

export default function NoInterestsScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Icono o emoji opcional */}
      <div className="text-6xl mb-6">🤔</div>

      {/* Mensaje principal */}
      <h2 className="text-2xl font-semibold text-gray-500 text-center mb-3">
        ¡Ups! Parece que no has seleccionado tus intereses
      </h2>

      {/* Mensaje secundario */}
      <p className="text-gray-400 text-center mb-6">
        Para poder crear un itinerario de viaje personalizado, primero
        necesitamos saber qué te gusta
      </p>

      {/* Link resaltado en naranja */}
      <Link
        href="/interests"
        className="text-orange-500 hover:text-orange-400 font-medium transition-colors duration-200 text-lg border-b border-orange-500/30 hover:border-orange-400"
      >
        Selecciona tus intereses aquí
      </Link>

      {/* Texto adicional opcional */}
      <p className="text-gray-500 text-sm mt-8">
        Puedes seleccionar hasta 10 intereses diferentes
      </p>
    </div>
  )
}
