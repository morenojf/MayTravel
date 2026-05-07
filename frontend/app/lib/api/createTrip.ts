'use server'

// schemas imports
import { TripData } from "../interfaces/Schemas"
import { BASE_API_URL } from "../consts";
import { cookies } from "next/headers";

// en la URL necesito pasar el id del usuario como param

export async function createTrip(tripData: TripData) {

	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value

	const response = await fetch(`${BASE_API_URL}/users/trips`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Cookie: `token=${token}`
		},
		body: JSON.stringify(tripData),
		credentials: 'include'
	})

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Error en el servidor");
	}

	const data = response.json()
	return data

}