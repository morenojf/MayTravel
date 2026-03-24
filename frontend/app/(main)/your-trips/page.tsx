import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
      <h1>
        Aún no tienes planes de viajes...
        <Link
          href="/create-trip"
          className="ml-2 text-sm font-bold text-orange-500"
        >
          Planificar un nuevo viaje.
        </Link>
      </h1>
    </div>
  )
}
