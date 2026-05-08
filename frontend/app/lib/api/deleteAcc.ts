'use server'
import { cookies } from "next/headers"
import logOut from "../utils/logout"
import { BASE_API_URL } from "../consts"

export default async function deleteAcc() {


	const cookiesStore = await cookies()
	const token = cookiesStore.get('token')?.value

	const response = await fetch(`${BASE_API_URL}/users`, {
		method: 'DELETE',
		headers: {
			'content-type': 'aplication/json',
			Cookie: `token=${token}`
		},
		credentials: 'include'
	})


	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Error al eliminar el usuario')
	}

	const data = await response.json()

	logOut()

	return data
}