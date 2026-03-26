import ItineraryInfo from '../ui/components/trip-itinerary/itinerary-info'
import Map from '../ui/components/trip-itinerary/map'

export default function Createtrip() {
  return (
    <div className="flex flex-row h-screen">
      {/* Acordeon side */}
      <div className="basis-160 py-5 px-5 overflow-y-auto scrollbar-minimalist">
        <ItineraryInfo />
      </div>
      {/* Map side */}
      <div className="basis-128 grow relative">
        <Map />
      </div>
    </div>
  )
}
