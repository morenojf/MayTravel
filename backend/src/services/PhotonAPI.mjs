export class PhotonService {
  // getLodgings (obtener lista de sugerencias de hospedajes cercanos a una coord para bucador en el frontend)
  // el lat y lng que recibe son las coordenadas de la ciudad a donde el usuario viaja
  static async getLodgings(lat, lng, has) {
    const TAG = 'tourism:hotel'
    const RESULTS_LIMIT = 5
    const PHOTON_URL = 'https://photon.komoot.io/api/'
    // const RADIO = 5000
    const query = `?q=${has}&lat=${lat}&lon=${lng}&limit=${RESULTS_LIMIT}&osm_tag=${TAG}`
    const MAX_ATTEMPS = 3
    let attempts = 0 // intentos de conexión a API
    let response

    // intento de conexión a la API de overpass
    console.log(`Estableciendo conexión con photon...`)
    do {
      attempts++
      console.log('intento ', attempts)
      response = await fetch(PHOTON_URL + query)
    } while (!response.ok && attempts < MAX_ATTEMPS)

    // retorno en caso de fallo en consulta a API de overpass
    if (!response.ok) {
      throw new Error(
        `Tras ${attempts} intentos de conexión, Photon falló con status: ${response.status}`
      )
    }

    const lodgings = await response.json()

    console.log('Conexión con Photon finalizada')

    return lodgings.features
  }
}
