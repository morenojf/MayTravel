'use client'

// styling import
import clsx from 'clsx'

// tags import for NextJS
import Image from 'next/image' // activa la etiqueta Image de NextJS para renderizar imagenes
import Link from 'next/link' // activa la etiqueta Link de NextJS para navegar entre paginas
import { usePathname } from 'next/navigation' // sirve para obtener la URL actual en la que se encuentra el usuario

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-row justify-between bg-[#f5f7fa] p-4 px-8 shadow-sm">
      {/* 1. Logo con fondo blanco y borde definido */}
      <Link href="/your-trips">
        <Image
          src="/favicon.png"
          width={50}
          height={50}
          alt="MT logo"
          className="rounded-full  flex-shrink-0 aspect-square object-contain p-1 bg-current"
        />
      </Link>

      {/* 2. Contenedor de links con separador y colores */}
      <div className="flex gap-6 items-center">
        <Link href="/your-trips">
          <p
            className={clsx('text-sm font-bold', {
              'text-sm font-bold text-orange-500': pathname === '/your-trips'
            })}
          >
            Tus viajes
          </p>
        </Link>

        {/* El separador vertical que falta en tu resultado */}
        <div className="h-6 w-[1px] bg-gray-300"></div>
        <Link href="/create-trip">
          <p
            className={clsx('text-sm font-bold', {
              'text-sm font-bold text-orange-500': pathname === '/create-trip'
            })}
          >
            Planificar viaje
          </p>
        </Link>
      </div>

      {/* 3. Imagen de perfil con sombra y borde */}
      <Image
        src="/profileCat.jpg"
        width={50}
        height={50}
        alt="Perfil"
        className="rounded-full border-2 border-white shadow-md object-cover flex-shrink-0 aspect-square"
      />
    </div>
  )
}
