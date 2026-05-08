import clsx from 'clsx'
import { LucideIcon, AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ModalLayout } from './ModalLayout'
import { useState } from 'react'
import logOut from '@/app/lib/utils/logout'

interface ConfigCard {
  icon?: LucideIcon
  configTitle: string
  configDescription: string
  ctaBtnName: string
  id: string
}

export default function ConfigCard({
  icon: Icon, // Podrías usar esta prop para el círculo
  configTitle,
  configDescription,
  ctaBtnName,
  id
}: ConfigCard) {
  const route = useRouter()
  type ModalType = 'image' | 'delete' | null
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  // Función auxiliar para cerrar
  const closeAllModales = () => setActiveModal(null)

  function handleCta() {
    if (id === 'deleteAcc') {
      setActiveModal('delete')
    }

    if (id === 'updatePic') {
      setActiveModal('image')
    }

    if (id === 'logOut') {
      logOut()
      route.push('/login')
    }
  }

  return (
    <>
      {/* MODALES */}
      <div>
        {activeModal === 'image' && (
          <ModalLayout onClose={closeAllModales}>
            <div className="p-6 gap-4 flex flex-col items-center">
              {/* Encabezado consistente: misma fuente y peso que el de borrado */}
              <h2 className="text-lg font-semibold text-slate-900 text-center leading-tight">
                Introduce la URL de tu nueva imagen de perfil
              </h2>

              {/* Input con bordes redondeados consistentes */}
              <input
                type="text"
                className="w-full border border-slate-200 p-3 rounded-lg text-sm"
                placeholder="https://tu-imagen.com/foto.jpg"
              />

              {/* Botones con el mismo diseño "Limpio" */}
              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={closeAllModales}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  No, en otro momento
                </button>

                {/* Aquí usamos el naranja de MayTravel como acento positivo */}
                <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  Actualizar imagen
                </button>
              </div>
            </div>
          </ModalLayout>
        )}

        {activeModal === 'delete' && (
          <ModalLayout onClose={closeAllModales}>
            <div className="p-6 text-center">
              {/* Icono sutil de peligro */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                ¿Eliminar cuenta definitivamente?
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Esta acción es permanente y no podrás recuperar tus viajes ni
                itinerarios de MayTravel.
              </p>

              <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-center gap-3">
                <button
                  onClick={closeAllModales}
                  className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  No, mantener cuenta
                </button>
                <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                  Sí, eliminar cuenta
                </button>
              </div>
            </div>
          </ModalLayout>
        )}
      </div>

      {/* FIN MODALES ------------------------------------------------------------------------------------------------------------*/}

      {/* Contenedor principal: items-center alinea verticalmente todo el renglón */}
      <div className="rounded-xl border border-slate-300 flex flex-row w-full p-4 items-center gap-4 shadow-sm mb-5">
        {/* Contenedor del Círculo/Icono */}

        {!Icon && (
          <div className="flex-none w-16 h-16 rounded-full border border-slate-900 flex items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">F</span>
          </div>
        )}

        {Icon && (
          <div className="flex-none w-16 h-16 flex items-center justify-center">
            <Icon size={32} className="text-slate-900"></Icon>
          </div>
        )}

        {/* Títulos: flex-1 hace que ocupe todo el espacio sobrante */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-bold text-lg text-slate-900 leading-tight">
            {configTitle}
          </h3>
          <p className="text-slate-500 text-sm">{configDescription}</p>
        </div>

        {/* Contenedor del Botón */}
        <button
          className={clsx(
            ctaBtnName === 'Eliminar cuenta'
              ? 'px-6 py-2 rounded-xl border text-red-600 border-red-600 font-bold hover:bg-red-200 transition-colors w-45'
              : 'px-6 py-2 rounded-xl border border-slate-900 font-bold hover:bg-slate-200 transition-colors w-45'
          )}
          onClick={handleCta}
        >
          {ctaBtnName}
        </button>
      </div>
    </>
  )
}
