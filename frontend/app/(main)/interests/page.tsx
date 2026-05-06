// obtener intereses de api
import getInterests, { getUserInterests } from '@/app/lib/api/interests'

// importar componente de logica para seleccion de intereses
import InterestsLogic from '@/app/ui/components/interests/interestsLogic'

export default async function InterestsPage() {
  const userInterests = await getUserInterests()
  const intereses = await getInterests()

  return (
    <>
      {/* main container */}
      <div>
        {/* HINT TEXT */}
        <div className="flex flex-col items-center">
          {/* TITLE */}
          <div>
            <b>
              <h1>SELECCIONA TUS INTERESES</h1>
            </b>
          </div>
          {/* DESCRIPTION */}
          <div className="w-lg text-center mt-2">
            <p>
              Esto facilitará a la
              <span className="text-orange-500 font-bold"> IA </span>
              proporcionarte las recomendaciones más adecuadas a la hora de
              generar tus itinerarios
            </p>
          </div>
        </div>

        {/* OPTIONS CONTAINER */}
        <div className="mt-15">
          <InterestsLogic interests={intereses} userInterests={userInterests} />
        </div>
      </div>
    </>
  )
}
