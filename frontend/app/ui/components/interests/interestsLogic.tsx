'use client'

import { useState } from 'react'
import { InterestCard } from '@/app/ui/components/common/interestsCards' // Ajusta la ruta
import { Interests } from '@/app/lib/interfaces/interests'

import {
  Speaker,
  FerrisWheel,
  Gamepad,
  Utensils,
  Castle,
  LandPlot,
  Palette,
  Landmark,
  Fish,
  PawPrint,
  TreePalm,
  Backpack,
  Binoculars,
  TreePine,
  Trees,
  Mountain,
  Music,
  Clapperboard,
  ShoppingBag,
  Handshake,
  Coffee,
  Beer,
  BottleWine,
  Church,
  Trophy
} from 'lucide-react'

import { attachInterests } from '@/app/lib/api/interests'

import { useRouter } from 'next/navigation'

// traduccion de iconos texto plano a funciones ya que no se puede pasar funciones de servidor a cliente
const iconComponents = {
  landmark: <Landmark />,
  palette: <Palette />,
  'land-plot': <LandPlot />,
  castle: <Castle />,
  fish: <Fish />,
  cat: <PawPrint />,
  'tree-palm': <TreePalm />,
  backpack: <Backpack />,
  binoculars: <Binoculars />,
  'tree-pine': <TreePine />,
  trees: <Trees />,
  mountain: <Mountain />,
  'ferris-wheel': <FerrisWheel />,
  music: <Music />,
  clapperboard: <Clapperboard />,
  'shopping-bag': <ShoppingBag />,
  handshake: <Handshake />,
  utensils: <Utensils />,
  coffee: <Coffee />,
  beer: <Beer />,
  'bottle-wine': <BottleWine />,
  church: <Church />,
  trophy: <Trophy />
}

interface InterestsList {
  interests: Interests[]
  userInterests: Interests[] | null
}

export default function InterestsLogic({
  interests,
  userInterests
}: InterestsList) {
  const CATEGORIES = interests
  const router = useRouter()

  // aniadir a lista de seleccionados
  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    return userInterests?.map((interest) => interest.id) || []
  })

  const toggleInterest = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id)
      }
      if (prev.length < 10) {
        return [...prev, id]
      }
      return prev
    })
  }

  // array de intereses seleccionados
  const selectedInterests = CATEGORIES.filter((cat) =>
    selectedIds.includes(cat.id)
  )

  // handleSubmit
  async function handleSubmit(selectedIds: number[]) {
    await attachInterests(selectedIds)
    router.push('your-trips')
    return
  }

  return (
    // MAIN CONTAINER
    <div className="relative min-h-[400px]">
      {/* SELECTION SECTION */}
      <div>
        <b>
          <p className="text-lg pl-4">
            Tus intereses ({selectedIds.length}/10)
          </p>
        </b>

        {/* SELECTED */}
        <div className="flex flex-wrap gap-3 p-4 min-h-[60px]">
          {selectedInterests.length > 0 ? (
            selectedInterests.map((item) => (
              <InterestCard
                key={item.id}
                {...item}
                icon={iconComponents[item.icon as keyof typeof iconComponents]}
                isSelected={true}
                onClick={() => toggleInterest(item.id)}
              />
            ))
          ) : (
            <p className="text-gray-400 italic">
              No has seleccionado nada aún...
            </p>
          )}
        </div>
        <hr className="my-6" />

        {/* UNSELECTED */}
        <div className="flex flex-wrap gap-3 p-4">
          {CATEGORIES.map((item) => (
            <InterestCard
              key={item.id}
              {...item}
              icon={iconComponents[item.icon as keyof typeof iconComponents]}
              isSelected={selectedIds.includes(item.id)}
              onClick={() => toggleInterest(item.id)}
            />
          ))}
        </div>
      </div>

      {/* BOTÓN ANIMADO */}
      <div
        className={`fixed bottom-10 right-10 transition-all duration-500 ease-in-out 
    ${selectedInterests.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      >
        <button
          className="bg-orange-500 hover:bg-orange-600 transition-transform text-white font-semibold py-2 px-6 rounded-full shadow-lg active:scale-95"
          onClick={() => handleSubmit(selectedIds)}
        >
          Guardar
        </button>
      </div>
    </div>
  )
}
