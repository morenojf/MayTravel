'use server'

import { BASE_API_URL } from "../consts"
import { cookies } from "next/headers"
import { Interests } from "../interfaces/interests";
import { translateInterests } from "../utils/translateInterests";

// Adjuntar intereses a un usuario
export async function attachInterests(interestsList: number[]) {

	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value

	// obtener cookie para pedir a la API la info del usuario logeado.
	const response = await fetch(`${BASE_API_URL}/users/interests`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json',
			'Cookie': `token=${token}`
		},
		body: JSON.stringify(interestsList),
		credentials: 'include'
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Error al adjuntar intereses')
	}

	const result = await response.json()
	return result

}

// obtener lista de intereses del usuario
export async function getUserInterests() {

	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value

	const response = await fetch(`${BASE_API_URL}/users/interests`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Cookie': `token=${token}`
		}
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Error al adjuntar intereses')
	}

	const result = await response.json()
	const translatedInt = translateInterests(result.interests)
	return translatedInt
}

// Obtener lista de todos los intereses
export default async function getInterests() {

	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value

	const response = await fetch(`${BASE_API_URL}/interests`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'Cookie': `token=${token}`
		}
	})

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Error al obtener intereses')
	}

	const interests = await response.json()



	// TRANSLATE RESULTS AND ADD ICONS
	const translatedCat = translateInterests(interests)


	return translatedCat
}