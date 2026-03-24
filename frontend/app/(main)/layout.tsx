import Navbar from '../ui/components/common/navbar'

//Layout: Es una función que envuelve a tus páginas.
// { children }: Es un "hueco" o marcador de posición. Representa el contenido de cualquier página (page.tsx) que el usuario esté viendo en ese momento (como la lista de viajes o el formulario de creación).
// React.ReactNode: Es simplemente una etiqueta de TypeScript que dice: "Aquí puede venir cualquier cosa que React sepa dibujar (texto, otros componentes, imágenes, etc.)".

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  )
}
