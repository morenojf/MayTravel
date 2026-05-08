'use server'

import { cookies } from "next/headers";
import { BASE_API_URL } from "../consts";

export default async function insertProfilePic(url: string) {

	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value

	const response = await fetch(`${BASE_API_URL}/users`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json',
			Cookie: `token=${token}`
		},
		body: JSON.stringify({ profilePic: url }),
		credentials: 'include'
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Error al actualizar la imagen de perfil')
	}

	const data = await response.json()
	return data

}