import { Stop } from '@/app/lib/interfaces/tripInterface'
import Image from 'next/image'
import { formatOpeningHours } from '@/app/lib/utils/formatDate_time'
import { formatTime } from '@/app/lib/utils/formatDate_time'
import { categoryTranslations } from '@/app/lib/utils/translateCategory'

export default function StopsCards({
  coming,
  leaving,
  name,
  business_hours,
  category
}: Stop) {
  return (
    <div className="px-3 py-2 transition-all duration-300 ease-in-out">
      <div className="flex flex-row items-center justify-between w-full bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-lg hover:border-orange-200 transition-all duration-300">
        <div className="flex flex-col space-y-2">
          {/* Mostramos la categoría traducida como un badge pequeño o texto secundario */}
          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">
            {categoryTranslations(category)}
          </span>

          <h3 className="text-base font-bold text-slate-800">{name}</h3>

          <div className="space-y-1">
            {/* Horario con icono sutil */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="font-medium text-slate-400">🕒 Horario:</span>
              {formatOpeningHours(business_hours)}
            </div>

            {/* Llegada y Salida en una sola línea o cápsulas */}
            <div className="flex gap-3 text-[11px] uppercase tracking-wider font-semibold">
              <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                Llegada: {formatTime(coming)}
              </span>
              <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                Salida: {formatTime(leaving)}
              </span>
            </div>
          </div>
        </div>

        {/* Imagen con aspecto ratio moderno */}
        <div className="relative w-24 h-20 flex-shrink-0 ml-4">
          <Image
            src="/placeholder-trip.jpg"
            alt={name}
            fill
            className="object-cover rounded-xl shadow-sm"
          />
        </div>
      </div>
    </div>
  )
}
