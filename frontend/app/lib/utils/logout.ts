'use server'

import { cookies } from "next/headers";

export default async function logOut() {

	const cookiesStore = await cookies()
	const setCookieFree = cookiesStore.delete('token')

	return { message: 'Sesión cerrada correctamente' }


}