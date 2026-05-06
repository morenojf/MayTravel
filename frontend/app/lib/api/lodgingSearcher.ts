'use server'

import { cookies } from "next/headers";
import { BASE_API_URL, MAX_DISTANCE_KM } from "../consts";
import { LodgingResult } from "../interfaces/lodgings";
import limitSuggestions from "../utils/limitSuggestions";

export default async function lodgingSearcher(params: string, original_lat: string, original_lng: string) {
	const cookieStore = await cookies()
	const token = cookieStore.get('token')?.value

	console.log(`${BASE_API_URL}/lodging-names?${params}`)

	const response = await fetch(`${BASE_API_URL}/lodging-names?${params}`,
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
		throw new Error(errorData.error || 'Error al buscar hospedajes')
	}

	const data = await response.json()

	// filtrar las sugerencias usando las coordenadas originales para que no aparezcan hospedajes de otros paises u estados
	const filteredSuggestions = data.filter((place: LodgingResult) => {
		if (!place.lodging_lat || !place.lodging_lng) return false;

		// convertir coords originales de string a number
		const lat1 = parseFloat(original_lat)
		const lng1 = parseFloat(original_lng)

		const distance = limitSuggestions(lat1, lng1, place.lodging_lat, place.lodging_lng)
		return distance <= MAX_DISTANCE_KM;
	})


	return filteredSuggestions

}