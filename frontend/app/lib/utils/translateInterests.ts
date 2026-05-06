// translate the interest name to spanish and adds the related icon

import { Interests } from "../interfaces/interests";

export function translateInterests(interests: Interests[]) {

	const dictionary =
		{
			'Dance hall': 'Discoteca',
			'Thematic Park': 'Parque de Diversiones',
			'Gamescon': 'Conferencia de videojuegos',
			'Restaurant': 'Restaurante'
		} as const

	type DictionaryKey = keyof typeof dictionary;

	const iconDictionary =
		{
			'Dance hall': 'Speaker',
			'Thematic Park': 'FerrisWheel',
			'Gamescon': 'Gamepad',
			'Restaurant': 'Utensils'
		} as const

	type IconDictionaryKey = keyof typeof dictionary;


	const translatedInt = interests.map((element: Interests) => {
		return {
			...element,
			name: dictionary[element.name as DictionaryKey] || element.name,
			icon: iconDictionary[element.name as IconDictionaryKey] || null
		}
	})

	return translatedInt

}