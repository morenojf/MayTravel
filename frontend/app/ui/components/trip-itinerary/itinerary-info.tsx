import Accordion from '../common/accordion'
import Link from 'next/link'
import Image from 'next/image'

export default function ItineraryInfo() {
  return (
    <div>
      {/* Header */}
      <div className="flex pb-5">
        <div className="flex-none">
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
        <div className="grow-1 justify-items-center">
          <h1 className="font-bold">MERIDA</h1>
          <p className="font-extralight text-xs">Merida, Venezuela</p>
        </div>
      </div>

      {/* Itinerary details */}
      <div className="py-2">
        <h1 className="font-bold">ITINERARIO</h1>
        <p className="font-extralight text-xs">Dic 12 - Ene 21</p>
      </div>

      {/* Accordion container */}
      <div className="py-2">
        <Accordion />
      </div>
    </div>
  )
}
