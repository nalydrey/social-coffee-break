import React from "react"

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: number | string | null
  name: string
  placeholder?: string
  error?: boolean
}

export const InputField = ({
  onChange = () => {},
  value = "",
  name,
  placeholder,
  error = false,
}: InputProps) => {
  return (
    <label
      className={` group-focus:text-green-400  
      ${error ? "border-red-600" : ""
      }`}
    >
      <input
        className="group"
        type="text"
        name={name}
        onChange={onChange}
        value={value || ""}
        placeholder={placeholder}
      />
    </label>
  )
}
