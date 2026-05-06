import Navbar from '../ui/components/common/navbar'
import { getUserData } from '../lib/api/userInfo'
import { Profile } from '../lib/interfaces/Schemas'

//Layout: Es una función que envuelve a tus páginas.
// { children }: Es un "hueco" o marcador de posición. Representa el contenido de cualquier página (page.tsx) que el usuario esté viendo en ese momento (como la lista de viajes o el formulario de creación).
// React.ReactNode: Es simplemente una etiqueta de TypeScript que dice: "Aquí puede venir cualquier cosa que React sepa dibujar (texto, otros componentes, imágenes, etc.)".

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const userData: Profile = await getUserData()

  return (
    <div>
      <Navbar
        email={userData.email}
        id={userData.id}
        role={userData.role}
        username={userData.username}
      />
      <main className="p-6">{children}</main>
    </div>
  )
}
