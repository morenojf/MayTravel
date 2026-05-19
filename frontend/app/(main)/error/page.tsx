'use client'

import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const mssg = searchParams.get('message')

  return (
    <div>
      <h1>Ups! Algo salió mal</h1>
      <p>{mssg || 'Error desconocido'}</p>
    </div>
  )
}
