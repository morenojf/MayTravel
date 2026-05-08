// translate the interest name to spanish and adds the related icon

import { Interests } from "../interfaces/interests";

export function translateInterests(interests: Interests[]) {

	const dictionary =
		{
			// CULTURA Y TURISMO
			'Museums': 'Museos',
			'Art Galleries': 'Galerías de Arte',
			'Historical Sites': 'Sitios Históricos',
			'Castles': 'Castillos',
			'Aquariums': 'Acuarios',
			'Zoos': 'Zoológicos',

			// NATURALEZA Y AVENTURA
			'Beaches': 'Playas',
			'Hiking Trails': 'Senderismo',
			'Viewpoints': 'Miradores',
			'Parks': 'Parques',
			'Nature Reserves': 'Reservas Naturales',
			'Mountains': 'Montañas',

			// ENTRETENIMIENTO Y OCIO
			'Thematic Parks': 'Parques Temáticos',
			'Nightclubs': 'Discotecas',
			'Cinemas': 'Cines',
			'Shopping Malls': 'Centros Comerciales',
			'Conventions': 'Convenciones',

			// GASTRONOMÍA
			'Restaurants': 'Restaurantes',
			'Cafes': 'Cafeterías',
			'Bars': 'Bares',
			'Pubs': 'Pubs',

			// OTROS
			'Religious Sites': 'Sitios Religiosos',
			'Stadiums': 'Estadios'
		} as const

	type DictionaryKey = keyof typeof dictionary;

	const iconDictionary =
		{
			'Museums': 'landmark',
			'Art Galleries': 'palette',
			'Historical Sites': 'land-plot',
			'Castles': 'castle',
			'Aquariums': 'fish',
			'Zoos': 'cat',
			'Beaches': 'tree-palm',
			'Hiking Trails': 'backpack',
			'Viewpoints': 'binoculars',
			'Parks': 'tree-pine',
			'Nature Reserves': 'trees',
			'Mountains': 'mountain',
			'Thematic Parks': 'ferris-wheel',
			'Nightclubs': 'music',
			'Cinemas': 'clapperboard',
			'Shopping Malls': 'shopping-bag',
			'Conventions': 'handshake',
			'Restaurants': 'utensils',
			'Cafes': 'coffee',
			'Bars': 'beer',
			'Pubs': 'bottle-wine',
			'Religious Sites': 'church',
			'Stadiums': 'trophy',
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