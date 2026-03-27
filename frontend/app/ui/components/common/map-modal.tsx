'use client'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./map/map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center">
      Cargando mapa...
    </div>
  )
})

interface MapModalProps {
  isOpen: boolean
  onClose: () => void
  coords: { lat: number; lng: number }
  onSelectCoordinates: (lat: number, lng: number) => void
  selectedLocation: { lat: number; lng: number } | null // <--- Nueva Prop
  sidebarContent: React.ReactNode
}

export default function MapModal({
  isOpen,
  onClose,
  coords,
  onSelectCoordinates,
  selectedLocation, // <--- La recibimos
  sidebarContent
}: MapModalProps) {
  if (!isOpen) return null

  return (
    // CAMBIO DE TAMAÑO: Ahora es w-[800px] (muy ancho) y h-[500px] (más alto)
    // El -left-1/2 o left-0 dependerá de cómo lo quieras centrar respecto al input
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] max-w-[95vw] h-[500px] z-[100] mt-2 shadow-2xl border border-gray-200 rounded-2xl bg-white flex flex-col animate-in fade-in zoom-in duration-200">
      {/* Cabecera del modal */}
      <div className="flex justify-between items-center p-3 bg-gray-50 border-b shrink-0">
        <span className="text-xs font-bold text-gray-700 uppercase tracking-widest px-2">
          Busca un hotel o selecciona un punto en el mapa
        </span>
        <button
          onClick={(e) => {
            e.preventDefault()
            onClose()
          }}
          className="p-1 hover:bg-gray-200 rounded-full text-red-500 font-bold"
        >
          Cerrar
        </button>
      </div>

      {/* CUERPO PRINCIPAL: Pantalla dividida (Grid) */}
      <div className="flex-1 grid grid-cols-3 h-full overflow-hidden">
        {/* Columna Izquierda: 1 fracción del espacio para la barra lateral (Resultados) */}
        <div className="col-span-1 border-r border-gray-200 bg-white overflow-y-auto p-4">
          {sidebarContent}
        </div>

        {/* Columna Derecha: 2 fracciones del espacio para el mapa */}
        <div className="col-span-2 relative h-full bg-gray-100">
          <Map
            center={[coords.lat, coords.lng]}
            onLocationSelect={onSelectCoordinates}
            selectedLocation={selectedLocation} // <--- Se la pasamos al Map
          />
        </div>
      </div>
    </div>
  )
}
