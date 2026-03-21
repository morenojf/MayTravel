import { PoisModel } from '../model/PoisModel.mjs'

export class PoisService {
  static async update(newData, id) {
    const objKeys = Object.keys(newData)
    if (objKeys.length === 0) return null

    const keyIndex = objKeys
      .map((key, index) => {
        return `${key} = $${index + 1}`
      })
      .join(', ')

    const values = objKeys.map((key) => newData[key])

    const idPosition = objKeys.length + 1
    values.push(id)

    const result = await PoisModel.update(keyIndex, values, idPosition)
    return result
  }

  static async getNearby(lng, lat, interestsList) {

	const RADIO = 5000
	// traducimos los intereses del usuario a las categorias que maneja la DB

    const posibleI = {
      'Dance hall': 'nightclub',
      'Thematic Park': 'park',
      Gamescon: 'conventions',
      Restaurant: 'restaurant'
    }

    const categories = Object.keys(posibleI)
      .filter((key) => interestsList.includes(key))
      .map((key) => posibleI[key])

	// consultamos a la base de datos
	const result = await PoisModel.getNearby(lng, lat , categories, RADIO)
	return result
  }

  // solicitud a API de overpass para POIS
  static async overpassService(interests, lat, lng) {
    // possible tags based on users_interests (Diccionario)
    const posibleI = {
      'Dance hall': '"amenity"="nightclub"',
      'Thematic Park': '"leisure"="park"',
      Gamescon: '"leisure"="conventions"',
      Restaurant: '"amenity"="restaurant"'
    }

    const RADIO = 5000
    const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'
    // const OVERPASS_URL = 'https://mock.codes/504'
    const DEFAULT_TIMEOUT = 120
    const MAX_ATTEMPS = 3
    let attempts = 0 // intentos de conexión a API
    let response

    // transforma los intereses del usuario en QL de Overpass
    const tagsQuery = Object.keys(posibleI)
      .filter((key) => interests.includes(key)) // Solo las que están en intereses
      .map((key) => `  nwr(around:${RADIO}, ${lat}, ${lng})[${posibleI[key]}];`)
      .join('\n')

    // define la query completa para overpass en QL.
    const query = `[out:json][timeout:${DEFAULT_TIMEOUT}];\n(\n${tagsQuery}\n);\nout geom;`

    // intento de conexión a la API de overpass
    console.log(`Estableciendo conexión con overpass...`)
    do {
      attempts++
      response = await fetch(OVERPASS_URL, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query)
      })
    } while (!response.ok && attempts < MAX_ATTEMPS)

    // retorno en caso de fallo en consulta a API de overpass
    if (!response.ok) {
      throw new Error(
        `Tras ${attempts} intentos de conexión, Overpass falló con status: ${response.status}`
      )
    }

    const pois = await response.json()

    // transformar datos crudos en limpios
    const formattedPois = pois.elements
      .filter((poi) => poi.tags?.name !== undefined)
      .map((poi) => {
        if (poi.tags.name === undefined) return
        // 1. Categoría (Prioridad de etiquetas)
        const category =
          poi.tags.amenity || poi.tags.leisure || poi.tags.tourism || 'unknown'

        // 2. Coordenadas (Node vs Way/Relation)
        let lat, lng
        if (poi.type === 'node') {
          lat = poi.lat
          lng = poi.lon
        } else {
          lat = (poi.bounds.minlat + poi.bounds.maxlat) / 2
          lng = (poi.bounds.minlon + poi.bounds.maxlon) / 2
        }

        // 3. Construcción de la dirección (Si existen los tags addr)
        // Combinamos calle y número si están disponibles
        const street = poi.tags['addr:street']
        const houseNumber = poi.tags['addr:housenumber']
        const fullAddress = street
          ? `${street}${houseNumber ? ' ' + houseNumber : ''}`
          : null

        return {
          poi_id: poi.id,
          name: poi.tags.name, // Si no tiene nombre, usamos la categoría
          category: category,
          lat: lat,
          lng: lng,
          // Si no existen en tags, estas llaves serán null
          address: fullAddress,
          opening_hours: poi.tags.opening_hours || 'No especificado'
        }
      })

    // filtrado de datos limpios para obtener POIS con nombres unicos
    const uniquePois = formattedPois.filter(
      (element, index, lista) =>
        index === lista.findIndex((poi) => poi.name === element.name)
    )

    // armo los valores de la query para insertar los pois en la DB
    const values = uniquePois.map((element) => {
      // condicionales de tiempo promedio
      const AVRG_STAY_MINUTES = {
        park: 60,
        nightclub: 180,
        default: 60
      }

      const stay =
        AVRG_STAY_MINUTES[element.category] || AVRG_STAY_MINUTES['default']

      return `(${element.poi_id}, '${element.name}', '${element.address}', ST_SetSRID(ST_MakePoint(${element.lng}, ${element.lat}), 4326), '${element.category}', '${element.opening_hours}', ${stay})`
    })

    // envio de POIS a la base de datos para guardarlos
    const result = PoisModel.create(values)
    return result
  }
}
