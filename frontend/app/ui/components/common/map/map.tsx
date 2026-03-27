'use client'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from 'react-leaflet'
import L from 'leaflet'

const redIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface MapProps {
  center: [number, number]
  zoom?: number
  onLocationSelect?: (lat: number, lng: number) => void
  selectedLocation: { lat: number; lng: number } | null // <--- Nueva Prop
}

// SUB-COMPONENTE: Es obligatorio crear este componente interno porque useMapEvents
// solo funciona DENTRO del contexto de un <MapContainer>
function ClickHandler({
  onLocationSelect
}: {
  onLocationSelect?: (lat: number, lng: number) => void
}) {
  useMapEvents({
    click(e) {
      if (onLocationSelect) {
        onLocationSelect(e.latlng.lat, e.latlng.lng)
      }
    }
  })
  return null // Ya no maneja el estado del marcador aquí
}

export default function Map({
  center,
  zoom = 13,
  onLocationSelect,
  selectedLocation
}: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marcador Rojo: Se dibuja si existe una ubicación seleccionada */}
      {selectedLocation && (
        <Marker
          position={[selectedLocation.lat, selectedLocation.lng]}
          icon={redIcon}
        >
          <Popup>¡Te hospedarás aquí!</Popup>
        </Marker>
      )}

      {/* Insertamos nuestro sub-componente que maneja los clics */}
      <ClickHandler onLocationSelect={onLocationSelect} />
    </MapContainer>
  )
}
