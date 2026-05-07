'use client'

import { useEffect, useState } from 'react'

interface InputFieldProps {
  label: string
  type: string
  id: string
  placeholder?: string
  errorMessage: string
}

export default function InputField({
  label,
  type,
  id,
  placeholder,
  errorMessage
}: InputFieldProps) {
  const [isRequired, setIsRequired] = useState(true)

  const [inputValue, setInputValue] = useState('')

  // Calcular la fecha mínima: día siguiente al actual en formato YYYY-MM-DD
  const getMinDate = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    // Formato YYYY-MM-DD
    const year = tomorrow.getFullYear()
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
    const day = String(tomorrow.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const minDate = type === 'date' ? getMinDate() : undefined

  return (
    <div className="flex flex-col mb-4">
      {/* Etiqueta del campo */}
      <label htmlFor={id} className="mt-3 ">
        {label}
      </label>

      {/* El Input (El Vigía) */}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        min={minDate}
        className="border p-2 rounded text-black mt-2"
        onChange={(e) => {
          setInputValue(e.target.value)
          setIsRequired(false)
        }}
      />

      {isRequired && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  )
}
