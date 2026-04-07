// schemas imports
import { TripData } from "./Schemas"

const BASE_URL = "http://localhost:4000"

// en la URL necesito pasar el id del usuario como param

export async function createTrip(userId: number, endpoint: string, tripData: TripData) {


	try {
		const response = await fetch(`${BASE_URL}/users/${userId}/${endpoint}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(tripData)
		})
		const data = response.json()
		return data
	} catch (error) {
		console.error(error)
	}
}