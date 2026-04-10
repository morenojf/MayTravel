/* eslint-disable no-unused-vars */
import { GoogleGenAI, ThinkingLevel } from '@google/genai'

const ai = new GoogleGenAI({})

export class GeminiService {
  static async createItinerary(pois, tripData) {
    console.log('Estableciendo conexión con Gemini')

    const prompt = `
	Actúa como planificador de viajes experto en ${tripData.title}.
      Organiza un itinerario desde el ${tripData.arrive_date} hasta el ${tripData.leave_date}.
      
      DATOS DE LOS LUGARES QUEN EL USUARIO LE GUSTARÍA VISITAR (POIs):
      ${JSON.stringify(pois)}

      COORDENADAS DE ALOJAMIENTO (Punto de partida diario):
      Lat: ${tripData.lat}, Lng: ${tripData.lng}

      REGLAS:
      1. El itinerario debe ser eficiente geográficamente (evitar cruzar la ciudad innecesariamente).
      2. Calcula arrival_time y departure_time basado en el average_stay_minutes de cada lugar.
      3. No incluyas más de 4 lugares por día.
	  4. Solo responde con el formato de respuesta
	  5. el stop_order debe reiniciarse al cambiar de fecha empezando de nuevo en 1.
      
      FORMATO DE RESPUESTA (JSON):
      [
        {
          "poi_catalog_id": "id_del_poi",
          "stop_order": 1,
          "arrival_time": "ISO_TIMESTAMP",
          "departure_time": "ISO_TIMESTAMP"
        }
      ]
	`

    // models:
    // gemini-3-flash-preview
    // gemini-3-pro-preview
    // gemini-2.5-flash

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: 0
        }
      }
    })

    // limpia la respuesta de Gemini para quitar texto posiblemente añadido
    const cleanResponse = response.text.replace(/```json|```/g, '').trim()

    console.log('Conexión con Gemini finalizada')

    // parsea el texto a JSON y retorna
    return JSON.parse(cleanResponse)
  }
}
