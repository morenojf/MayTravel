'use client'

import InputField from '../common/input-field'
import Image from 'next/image'
import { newUser } from '@/app/lib/api/signUpUser'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterForm() {
  const router = useRouter()
  // handleSubmit form
  async function handleSubmit(formData: FormData) {
    try {
      const userData = {
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string
      }
      // post para enviar los datos del nuevo usuario a la db
      const response = await newUser(userData)

      // redirige al usuario nuevo a seleccionar sus intereses
      router.push('/interests')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="bg-[#5EA4CB] min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-96"
        action={handleSubmit}
      >
        <Image
          src="/Logo_MT_transp.png"
          width={180} // Un tamaño mucho más razonable
          height={180} // Mantenemos la proporción cuadrada del logo
          className="mx-auto mb-6 block" // Centrado horizontal y margen inferior
          alt="MT logo"
          priority // Recomendado para el logo (mejora el LCP)
        />

        <InputField
          label="Nombre de usuario"
          type="text"
          id="username"
          placeholder="usuario123"
          errorMessage="Ese nombre de usuario ya existe"
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

        <button
          type="submit"
          className="w-full mt-4 bg-[#5EA4CB] text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors"
        >
          Entrar
        </button>
        <div className="justify-self-center pt-3">
          <Link href="/login" className="text-sm text-blue-600 underline">
            ¿Ya tienes una cuenta?
          </Link>
        </div>
      </form>
    </div>
  )
}
