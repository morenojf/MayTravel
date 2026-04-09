'use client'

import InputField from '../common/input-field'
import Image from 'next/image'
import { authUser } from '@/app/lib/api/authUser'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  // handleSubmit form
  async function handleSubmit(formData: FormData) {
    try {
      const userInfo = {
        identifier: formData.get('email') as string,
        password: formData.get('password') as string
      }
      const response = await authUser(userInfo)
      router.push('/your-trips')
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
      </form>
    </div>
  )
}
