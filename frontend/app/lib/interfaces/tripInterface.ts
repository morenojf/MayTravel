export interface SingleTrip {
	id: number,
	title: string,
	shelter: string,
	arrd: string,
	leavd: string
}

export interface userTrips {
	user_id: number,
	username: string,
	trips: SingleTrip[]
}