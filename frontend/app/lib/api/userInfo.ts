import { BASE_API_URL } from "../consts";
import { cookies } from "next/headers"

export async function getUserData() {

	// obtener cookie para pedir a la API la info del usuario logeado.
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value

	const response = await fetch(`${BASE_API_URL}/profile`,
		{
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Cookie': `token=${token}`
			}
		}
	)

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Error al obtener datos de usuario')
	}


	const userData = await response.json()
	return userData
}