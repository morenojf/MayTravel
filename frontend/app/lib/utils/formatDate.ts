export const formatDate = (isoString: string) => {
	const date = new Date(isoString);

	return date.toLocaleDateString('es-ES', {
		day: 'numeric',
		month: 'short'
	})
}