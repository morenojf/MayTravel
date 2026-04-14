import { BASE_API_URL } from "../consts"
import { cookies } from "next/headers"

export async function getTrips() {

	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value

	// 2. Hacemos la consulta a la API enviando las cookies en la cabecera (credentials: 'include')
	const response = await fetch(`${BASE_API_URL}/users/trips`,
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
		throw new Error(errorData.error || 'Error al obtener viajes')
	}

	const tripData = await response.json()
	return tripData
}

export async function getTripById(tripId: number) {

	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value

	const response = await fetch(`${BASE_API_URL}/trips/${tripId}`,
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
		throw new Error(errorData.error || 'Error al obtener los detalles del viaje')
	}

	return await response.json()
}