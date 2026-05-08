'use client'

import { Profile } from '@/app/lib/interfaces/Schemas'
import ConfigCard from '@/app/ui/components/profile-configs/config-card'
import { LogOut, Trash } from 'lucide-react'

export default function ConfigAccClient({ userData }: { userData: Profile }) {
  return (
    <div className="p-4">
      {/* HEADER */}
      <div>
        <b>
          <h1 className="text-2xl">Configuración</h1>
        </b>
        <p className="text-slate-500">Gestiona tus preferencias</p>
      </div>
      {/* PROFILE SECTION */}
      <div className="mt-7">
        <b>
          <p>Perfil</p>
        </b>
        <ConfigCard
          configTitle="Imagen de perfil"
          configDescription="Actualiza tu foto de perfil"
          ctaBtnName="Cambiar Imagen"
          id="updatePic"
          userName={userData.username}
          profilePic={userData.profilepic}
        />
      </div>
      {/* ACCOUNT SECTION */}
      <div className="mt-7 gap-4">
        <b>
          <p>Cuenta</p>
        </b>

        <ConfigCard
          configTitle="Eliminar cuenta"
          configDescription="Eliminar tu cuenta y los datos asociados"
          ctaBtnName="Eliminar cuenta"
          icon={Trash}
          id="deleteAcc"
        />

        <ConfigCard
          configTitle="Cerrar sesión"
          configDescription="Sal de tu cuenta"
          ctaBtnName="Cerrar sesión"
          icon={LogOut}
          id="logOut"
        />
      </div>
    </div>
  )
}
