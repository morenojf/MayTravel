'use client'

import InputField from '../common/input-field'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginForm() {
  return (
    <div className="bg-[#5EA4CB] min-h-screen flex items-center justify-center">
      <form className="bg-white p-8 rounded-xl shadow-lg w-96">
        <Image
          src="/Logo_MT_transp.png"
          width={180} // Un tamaño mucho más razonable
          height={180} // Mantenemos la proporción cuadrada del logo
          className="mx-auto mb-6 block" // Centrado horizontal y margen inferior
          alt="MT logo"
          priority // Recomendado para el logo (mejora el LCP)
        />

        <InputField
          label="Correo Electrónico"
          type="email"
          id="email"
          placeholder="tu@correo.com"
          errorMessage="Por favor, ingresa un correo válido."
        />

        <InputField
          label="Contraseña"
          type="password"
          id="password"
          placeholder="********"
          errorMessage="La contraseña es obligatoria."
        />
        <Link href="/your-trips">
          <button
            type="submit"
            className="w-full mt-4 bg-[#5EA4CB] text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors"
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  )
}
