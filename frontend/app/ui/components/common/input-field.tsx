'use client'

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
  return (
    <div className="flex flex-col mb-4">
      {/* Etiqueta del campo */}
      <label
        htmlFor={id}
        className="mb-1 mt-3 text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      {/* El Input (El Vigía) */}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required
        className="peer px-4 py-2 border border-gray-300 rounded-lg text-gray-900 
                   focus:outline-none focus:ring-2 focus:ring-[#5EA4CB] focus:border-transparent 
                   invalid:[&:not(:placeholder-shown)]:border-red-500"
      />

      {/* El Mensaje de Error (El Reactor) */}
      <p className="mt-1 text-sm text-red-500 invisible peer-invalid:[&:not(:placeholder-shown)]:visible">
        {errorMessage}
      </p>
    </div>
  )
}
