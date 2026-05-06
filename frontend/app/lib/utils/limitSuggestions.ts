export default function limitSuggestions(original_lat: number, original_lng: number, suggest_lat: number, suggest_lng: number) {
	const R = 6371; // Radio de la Tierra en km
	const dLat = deg2rad(suggest_lat - original_lat);
	const dLon = deg2rad(suggest_lng - original_lng);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(original_lat)) * Math.cos(deg2rad(suggest_lat)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c;

	return d;
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}