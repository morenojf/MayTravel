export const categoryTranslations = (category: string) => {

	if (!category) return 'Lugar'

	const key = category.toLowerCase()

	const categoryTranslations: Record<string, string> = {
		park: 'Parque',
		bar: 'Bar',
		disco: 'Discoteca',
		nightclub: 'Club Nocturno',
		restaurant: 'Restaurante',
		museum: 'Museo',
		landmark: 'Sitio de Interés',
		beach: 'Playa',
		// Agrega todas las que esperes del API
	};



	return categoryTranslations[key] || category
};