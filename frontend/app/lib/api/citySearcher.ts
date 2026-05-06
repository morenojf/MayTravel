'use server'

import { cookies } from "next/headers"
import { BASE_API_URL } from "../consts"

export default async function citySearcher(inputValue: string) {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value

	const response = await fetch(
		`${BASE_API_URL}/city-name/${inputValue}`,
		{
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Cookie: `token=${token}`
			}
		}
	)

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Error al obtener datos del buscador de ciudades')
	}

	const data = await response.json()
	return data
}