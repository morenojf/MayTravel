export interface SingleTrip {
	id: number,
	title: string,
	shelter: string,
	arrd: string,
	leavd: string
}

export interface UserTrips {
	user_id: number,
	username: string,
	trips: SingleTrip[]
}

export interface DetailedTrip {
	arrive_date: string,
	leave_date: string,
	shelter: string,
	title: string,
	shelter_lat: number,
	shelter_lng: number,
	itinerary: {
		[date: string]: Stop[]
	}
}

export interface Stop {
	id: number,
	category: string,
	coming: string,
	leaving: string,
	name: string,
	business_hours: string,
	lat: number,
	lng: number
}