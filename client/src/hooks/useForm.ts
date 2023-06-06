import { useEffect, useState } from "react"

type UseForm = (formFields: Params[]) => {
  fields: Field[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (cb: () => void) => void
  clearForm: () => void
  isValid: boolean
}

export interface Params {
  name: string
  placeholder?: string
  required?: boolean
  errorText?: string
}

export interface Field {
  name: string
  text: string
  isError: boolean
  placeholder: string
}

export const useForm: UseForm = (formFields) => {
  const [fields, setFields] = useState<Field[]>([])
  const [isValid, setValid] = useState<boolean>(false)
  useEffect(() => {
    setFields(createTemplate())
  }, [])

  const createTemplate = (): Field[] => {
    return formFields.map((field) => {
      return {
        name: field.name,
        text: "",
        isError: false,
        placeholder: field.placeholder || "",
      }
    })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value
    const changedFields = fields.map((field) => {
      if (field.name === event.target.name) {
        return { ...field, text: val, isError: !val }
      } else {
        return field
      }
    })
    setValid(changedFields.every((field) => !field.isError))

    setFields(changedFields)
  }

  const onSubmit = (cb: () => void) => {
    const validArr = fields.map((field) => ({ ...field, isError: !field.text }))
    setFields(validArr)
    if (isValid) {
      cb()
    }
  }

  const clearForm = () => {
    setFields(createTemplate())
  }

  return {
    isValid,
    fields,
    onChange,
    onSubmit,
    clearForm,
  }
}
