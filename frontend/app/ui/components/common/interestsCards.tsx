interface InterestCardProps {
  name: string
  icon: React.ReactNode
  isSelected: boolean
  onClick: () => void
}

export function InterestCard({
  name,
  icon,
  isSelected,
  onClick
}: InterestCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-2 border rounded-full transition-all shadow-sm
        ${
          isSelected
            ? 'border-orange-500 bg-orange-50 text-orange-600'
            : 'border-black hover:bg-gray-100 text-black'
        }`}
    >
      <span className="font-bold text-sm uppercase">{name}</span>
      <div className={isSelected ? 'text-orange-500' : 'text-black'}>
        {icon}
      </div>
    </button>
  )
}
