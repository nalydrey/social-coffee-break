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
      className={`group-focus:bg-red-500  block border-4 rounded-xl p-1 border-blue-300 ${
        error ? "border-red-600" : ""
      }`}
    >
      <input
        className=" text-2xl w-full p-1 outline-0 rounded-lg focus:bg-gray-500/20"
        type="text"
        name={name}
        onChange={onChange}
        value={value || ""}
        placeholder={placeholder}
      />
    </label>
  )
}
