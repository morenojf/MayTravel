// schemas imports
import { TripData } from "../interfaces/Schemas"
import { BASE_API_URL } from "../consts";

// en la URL necesito pasar el id del usuario como param

export async function createTrip(userId: number, endpoint: string, tripData: TripData) {

	const response = await fetch(`${BASE_API_URL}/users/${userId}/${endpoint}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(tripData)
	})

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Error en el servidor");
	}

	const data = response.json()
	return data

}