import { PUBLIC_BASE_API_URL } from "../consts"
import { NewUserInfo } from "../interfaces/Schemas"

export async function newUser(userData: NewUserInfo) {

	const response = await fetch(`${PUBLIC_BASE_API_URL}/auth/register`,
		{
			method: 'post',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(userData),
			credentials: 'include'
		}
	)

	if (!response.ok) {
		const errorData = await response.json()
		throw new Error(errorData.error || 'Problemas al crear el usuario')
	}

	const signedUpInfo = await response.json()
	if (signedUpInfo.message === 'User registered succesfully') {
		return signedUpInfo.message
	}
}