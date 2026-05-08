import { useEffect } from 'react'

interface ModalLayoutProps {
  children: React.ReactNode
  onClose: () => void
}

export function ModalLayout({ children, onClose }: ModalLayoutProps) {
  // useEffect para cerrar con la tecla Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    // Fondo oscuro que ocupa toda la pantalla (overlay)
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose} // Cerrar si se hace click en el fondo
    >
      {/* Contenedor del Modal real (donde va el diseño) */}
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // Importante: evita que el click dentro cierre el modal
      >
        {/* Botón X de cierre general */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          {/* Tu icono X de Lucide */}
        </button>

        {children}
      </div>
    </div>
  )
}
