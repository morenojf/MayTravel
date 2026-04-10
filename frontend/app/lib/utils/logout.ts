export default function logOut() {
	document.cookie = "token=; Max-Age=0; path=/"; // Borra la cookie 'token'

}