'use client'

// styling import
import clsx from 'clsx'

// tags import for NextJS
import Image from 'next/image' // activa la etiqueta Image de NextJS para renderizar imagenes
import Link from 'next/link' // activa la etiqueta Link de NextJS para navegar entre paginas
import { usePathname } from 'next/navigation' // sirve para obtener la URL actual en la que se encuentra el usuario
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

// funcion para cierre de sesion
import logOut from '@/app/lib/utils/logout'

export default function Navbar() {
  const pathname = usePathname()
  const route = useRouter()

  // apertura de menu useState
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // apuntador al div del menu useRef
  const menuContainerRef = useRef<HTMLDivElement>(null)

  const menuOptions = [
    { id: 'options', label: 'Configuración' },
    { id: 'editProfile', label: 'Editar Perfil' },
    { id: 'logout', label: 'Cerrar Sesión' }
  ]

  // function handleClick para abrir menu desplegable del profile
  function handleClick() {
    setIsMenuOpen(!isMenuOpen)
  }

  // funcion seleccion de opciones del menu
  function handleSelect(option: string) {
    if (option === 'logout') {
      logOut()
      route.push('/login')
    }
    setIsMenuOpen(false)
  }

  // funcion para cerrar el menu al presionar escape o fuera del menu
  useEffect(() => {
    if (!isMenuOpen) return

    // arrow function que escucha los clicks si ocurren fuera de menuRef entonces cierra el menu
    const handleClickOutside = (e: MouseEvent) => {
      // Si tenemos la referencia del menú Y el clic NO fue dentro del menú...
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target as Node)
      ) {
        // .contains(e.target) funcion de javascript que pregunta, este elemento que recibio el click
        // esta dentro de mis fronteras?

        setIsMenuOpen(false)
      }
    }

    // escuchamos clicks en toda la pagina
    document.addEventListener('mousedown', handleClickOutside)

    // arrow function que recibe un evento de argumento (presionar una tecla) y al coincidir con la tecla Escape cierra menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    // Decimos al navegador que cada vez que precionen una tecla active la funcion handleKey
    window.addEventListener('keydown', handleKeyDown)

    // limpiar el evento de tecla y click fuera del menu cuando el menu se cierra
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }

    // se limpia el evento porque sino, cada vez que se abra y cierre el menu se crea un "escucha" nuevo
    // despues de abrirlo 10 veces tendrias 10 centinelas vigilando la tecla Escape al mismo tiempo
    // Memory Leak
  }, [isMenuOpen]) // se ejecuta cada vez que isMenuOpen cambie

  return (
    <>
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

        {/* 3. div menu */}
        {/* el menu se envuelve en un div con la foto de perfil para pocisionar a los dos juntos */}
        <div ref={menuContainerRef} className="relative">
          {/* Imagen de perfil con sombra y borde */}
          <Image
            src="/profileCat.jpg"
            width={50}
            height={50}
            alt="Perfil"
            className="rounded-full border-2 border-white shadow-md object-cover flex-shrink-0 aspect-square"
            onClick={handleClick}
          />
          {/* Menu desplegable de opciones de perfil */}
          <div
            className={clsx(
              'absolute bg-white right-0 mt-1 border-black border-solid border-1 rounded-sm w-3xs h-fit z-50 transition-all origin-top-right duration-200 ease-out transform',
              {
                'opacity-100 scale-100 pointer-events-auto': isMenuOpen,
                'opacity-0 scale-95 pointer-events-none': !isMenuOpen
              }
            )}
          >
            <ul className="px-5 py-1">
              {menuOptions.map((option) => {
                return (
                  <li
                    className="py-1 hover:text-orange-500 cursor-pointer select-none"
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                  >
                    {option.label}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
