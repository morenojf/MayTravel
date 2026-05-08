/* eslint-disable no-unused-vars */
import { GoogleGenAI, ThinkingLevel } from '@google/genai'

const ai = new GoogleGenAI({})

export class GeminiService {
  static async createItinerary(pois, tripData) {
    console.log('Estableciendo conexión con Gemini')

    const prompt = `
	  Actúa como planificador de viajes experto en ${tripData.title}.
      Organiza un itinerario desde el ${tripData.arrive_date} hasta el ${tripData.leave_date}.
      
      DATOS DE LOS LUGARES DISPONIBLES (POIs):      
      ${JSON.stringify(pois)}

      COORDENADAS DE ALOJAMIENTO (Punto de partida diario):
      Lat: ${tripData.lat}, Lng: ${tripData.lng}

      REGLAS:
      1. El itinerario debe ser eficiente geográficamente (evitar cruzar la ciudad innecesariamente).
      2. Calcula arrival_time y departure_time basado en el average_stay_minutes de cada lugar.
      3. No incluyas más de 6 lugares por día.
	  4. el stop_order debe reiniciarse al cambiar de fecha empezando de nuevo en 1.
	  5. Los horarios de llegada a un POI no debe estar fuera del rango del business_hour
	  6. IDENTIDAD: El campo "poi_catalog_id" es la llave primaria de mi base de datos. Si usas un número que NO esté en la lista de POIs proporcionada, el sistema fallará.
	  7. PROHIBICIÓN: No generes IDs secuenciales (1001, 1002, etc.). Usa únicamente los números largos (BIGINT) que vienen en el JSON de entrada.
	  8. Solo responde con un array JSON válido, sin texto adicional antes o después.
	  9. Los restaurants solo pueden ser visitados en rangos horarios que coincidan con las comidas diarias como 9:00-10:00 AM, 12:00-01:00 PM, 07:00-08:00 PM y no pueden haber dos o mas stops categorizadas como restaurant de forma consecutiva.
	  10. Los POIS seleccionados deben estar dispersos de forma variada en un radio no mayor a 50 KM desde el punto de partida diario.
      
      FORMATO DE RESPUESTA (JSON PURO):
      [
        {
          "poi_catalog_id": 700649029,
          "stop_order": 1,
          "arrival_time": "ISO_TIMESTAMP",
          "departure_time": "ISO_TIMESTAMP"
		  "business_hour": "ISO_TIMESTAMP"
        }
      ]
	`

    // models:
    // gemini-3-flash-preview
    // gemini-3-pro-preview
    // gemini-2.5-flash

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
      //   config: {
      //     thinkingConfig: {
      //       thinkingLevel: 0
      //     }
      //   }
    })

    const response = await result

    // limpia la respuesta de Gemini para quitar texto posiblemente añadido
    const cleanResponse = await response.text.replace(/```json|```/g, '').trim()

    console.log('Conexión con Gemini finalizada')
    // parsea el texto a JSON y retorna
    return JSON.parse(cleanResponse)
  }
}
