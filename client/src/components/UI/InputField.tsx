import {useState} from 'react'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import React from "react"

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: number | string | null
  name: string
  className?: string
  placeholder?: string
  error?: boolean | string
  id: string
  label: string
  type?: 'text' | 'password' | 'number' | 'email'
}

export const InputField = ({
  onChange = () => {},
  value = "",
  name,
  className,
  label,
  id,
  type='text',
  placeholder,
  error = false,
}: InputProps) => {

  const [toggle, setToggle] = useState(false)

  const handlerToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div className={`flex mt-2 ${className}`}>
      <div className="relative flex w-full">
        <input
            id={id}
            autoComplete='off'
            className={`font-bold w-full group peer placeholder:text-transparent focus:outline-none outline-none focus:border-blue-400 border-b-2 duration-700  ${error ? 'border-red-500':'border-gray-400'} bg-transparent focus:placeholder:text-gray-400`}
            type={toggle ? 'text' : type}
            name={name}
            onChange={onChange}
            value={value || ""}
            placeholder={placeholder ? placeholder : ''}
          />
        <label
          htmlFor={id}
          className={`absolute duration-300 top-0 left-0 peer-focus:-translate-y-full 
          ${error ? 'text-red-500':'text-sky-600'}
          ${value ? '-translate-y-full' : ''} `}
        >
          {error ? error : label} 
        </label>
        <div className=""
            onClick={handlerToggle}
        >
          {type==='password' &&
            <>
              {
                toggle
                ?
                <EyeIcon className="w-5 h-5 text-gray-700"/>
                :
                <EyeSlashIcon className="w-5 h-5 text-gray-700"/>
              }
            </>
          }
      </div>
    </div>
  </div>
    
  )
}
