export interface TripData {
	title: string | null, // Nombre de la ciudad
	lat: number | undefined, // lat del hospedaje
	lng: number | undefined, // lng del hospedaje
	arrive_date: string | null, // fecha de llegada
	leave_date: string | null // fecha de salida
}

export interface UserInfo {
	identifier: string,
	password: string,
}

export interface NewUserInfo {
	username: string,
	email: string,
	password: string
}

export interface Profile {
	username: string,
	email: string,
	role: string,
	id: number,
	profilepic: string | null
}