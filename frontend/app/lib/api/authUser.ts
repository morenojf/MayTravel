import { UserInfo } from "../interfaces/Schemas";
import { PUBLIC_BASE_API_URL } from "../consts";

export async function authUser(userInfo: UserInfo) {
	const response = await fetch(`${PUBLIC_BASE_API_URL}/auth/login`,
		{
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(userInfo),
			credentials: 'include'
		}
	)

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || "Error al autenticar usuario");
	}

	const sessionInfo = await response.json()
	if (sessionInfo.message === 'Authenticated user') {
		const mssg = 'user loged in correctly'
		return mssg
	}
}