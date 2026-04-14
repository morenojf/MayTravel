'use client'

import Link from 'next/link'
import Image from 'next/image'
import { DetailedTrip } from '@/app/lib/interfaces/tripInterface'
import { formatDate } from '@/app/lib/utils/formatDate_time'
import StopsCards from '../common/poi-card'
import { alphaNumFormatDate } from '@/app/lib/utils/formatDate_time'

export default function ItineraryInfo({ data }: { data: DetailedTrip }) {
  const tripDetails = data
  const tripNames = data.title.split(',') // [city, estate, country]
  const arriveD = formatDate(data.arrive_date)
  const leaveD = formatDate(data.leave_date)

  // obtener las entradas del objeto itinerary {date: [stops]} de modo que podamos convertir
  // el objeto en un array [ [date, [stops]], [date, [stops]] ] e iterar sobre el para renderizar
  // una entrada en el acordeon por cada date
  // a su vez ordenamos las dates de forma ascendente para que las fechas esten en orden
  const itineraryEntries = Object.entries(tripDetails.itinerary).sort(
    (a, b) => {
      const dateA = new Date(a[0]).getTime()
      const dateB = new Date(b[0]).getTime()
      return dateA - dateB // Orden ascendente
    }
  )

  //   const tripStops = tripDetails.stops

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 px-5 z-20 flex items-center justify-between w-full bg-white py-4 ">
        {/* Logo a la izquierda */}
        <div className="flex-none w-[50px]">
          <Link href="/your-trips">
            <Image
              src="/favicon.png"
              width={50}
              height={50}
              alt="MT logo"
              className="rounded-full  flex-shrink-0 aspect-square object-contain p-1 bg-current"
            />
          </Link>
        </div>

        {/* Texto centrado */}
        <div className="grow-1 justify-items-center">
          <h1 className="font-bold">{tripNames[0]}</h1>
          <p className="font-extralight text-xs">
            <b>
              {tripNames[1]}, {tripNames[2]}
            </b>
          </p>
        </div>
      </div>

      {/* Itinerary details */}
      <div className="py-2 px-5">
        <h1 className="font-bold">ITINERARIO</h1>
        <p className="font-extralight text-xs">
          {arriveD} - {leaveD}
        </p>
      </div>

      {/* Accordion container */}
      <div className="py-2 px-5">
        <div className="w-full max-w-2xl mx-auto ">
          {/* Accordion header */}
          {itineraryEntries.map(([date, stops]) => (
            <details
              key={date}
              className="group mb-4 border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  {/* La flecha con rotación dinámica */}
                  <span className="text-blue-900 transition-transform duration-300 group-open:rotate-90">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                  <span className="text-lg font-bold text-slate-800 capitalize">
                    {alphaNumFormatDate(date)}
                  </span>
                </div>

                {/* Badge opcional: muestra cuántas paradas hay ese día */}
                <span className="text-xs font-semibold bg-white px-2 py-1 rounded-full text-slate-400 border border-slate-200">
                  {stops.length} {stops.length === 1 ? 'parada' : 'paradas'}
                </span>
              </summary>

              {/* Accordion entry description (Cards) */}
              {stops.map((element) => (
                <StopsCards
                  key={element.id}
                  id={element.id}
                  coming={element.coming}
                  leaving={element.leaving}
                  name={element.name}
                  category={element.category}
                  business_hours={element.business_hours}
                  lat={element.lat}
                  lng={element.lng}
                />
              ))}
            </details>
          ))}
        </div>
      </div>
    </>
  )
}
