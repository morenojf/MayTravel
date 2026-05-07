// recibe dos fechas, llegada y salida, en formato ISOString para comparar si la fecha de llegada es anterior a la fecha de salida

export default function compareDates(arrIsoStringDate: string, leaveIsoStringDate: string) {

	const arrival = new Date(arrIsoStringDate);
	const departure = new Date(leaveIsoStringDate);

	// Validar que ambas fechas sean válidas
	if (isNaN(arrival.getTime()) || isNaN(departure.getTime())) {
		throw new Error('Una o ambas fechas son inválidas');
	}

	// Retorna true si llegada es anterior a salida, false en caso contrario
	return arrival < departure;
}