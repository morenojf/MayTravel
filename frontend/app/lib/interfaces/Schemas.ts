export interface TripData {
	title: string, // Nombre de la ciudad
	lat: number, // lat del hospedaje
	lng: number, // lng del hospedaje
	arrive_date: string, // fecha de llegada
	leave_date: string // fecha de salida
}

export interface UserInfo {
	identifier: string,
	password: string,
}