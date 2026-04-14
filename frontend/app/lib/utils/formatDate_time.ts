// formatear fechase llegada y salida del viaje en itinerario (Ej: 7 abr - 13 abr)
export const formatDate = (isoString: string) => {
	const date = new Date(isoString);

	return date.toLocaleDateString('es-ES', {
		day: 'numeric',
		month: 'short'
	})
}

// formatear fechas de cada entrada en el acordeon
export const alphaNumFormatDate = (isoString: string) => {
	const date = new Date(isoString)

	const formatted = new Intl.DateTimeFormat('es-ES', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	}).format(date)

	// Capitalizar la primera letra
	const finalString = formatted.charAt(0).toUpperCase() + formatted.slice(1);

	return finalString
}

// formatear hora de llegada y salida de cada POI en las poiCards
export const formatTime = (isoString: string) => {
	const date = new Date(isoString);

	const options: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true, // Esto fuerza el formato AM/PM
	};

	const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);

	// Limpieza: Quitar espacios y convertir a mayúsculas para que quede "6:00PM"
	// Si prefieres que "6:00" sea solo "6", podemos hacer un replace:
	return formattedTime.replace(':00', '').replace(' ', '');
};

// formatear horario de trabajo de POIS
export const formatOpeningHours = (rawSchedule: string) => {
	if (!rawSchedule) return "Horario no disponible";
	if (rawSchedule == 'No especificado') return "Horario no disponible";

	// Diccionario para traducir los días
	const daysMap: Record<string, string> = {
		'Mo': 'Lunes', 'Tu': 'Martes', 'We': 'Miércoles', 'Th': 'Jueves',
		'Fr': 'Viernes', 'Sa': 'Sábado', 'Su': 'Domingo'
	};

	// Separamos por punto y coma (;) para obtener los diferentes bloques
	return rawSchedule.split(';').map(block => {
		const [daysRange, hours] = block.trim().split(' ');

		// Si el bloque de días tiene un guion (Tu-Sa), lo traducimos como "a"
		const translatedDays = daysRange.split('-').map(d => daysMap[d] || d).join(' a ');

		return `${translatedDays}: ${hours}`;
	}).join(' | '); // Puedes usar ' | ' o '\n' para separar los bloques

};
