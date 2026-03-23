// app/page.tsx
import { redirect } from 'next/navigation'

export default function RootPage() {
  // En el futuro, aquí verificarás si hay una sesión activa
  // Si no hay sesión, lo mandamos al login
  redirect('/login')

  return null // No renderiza nada porque redirige antes
}
