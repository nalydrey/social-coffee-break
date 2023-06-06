import React from "react"
import { controlMessageModal } from "../../slices/auxiliarySlice"
import { useAppDispatch } from "../../hooks/hooks"

export const Header = () => {
  const dispatch = useAppDispatch()

  const operRegisterForm = () => {
    dispatch(controlMessageModal(true))
  }

  return (
    <header className=" bg-gradient-to-r from-sky-700 via-sky-900 to-sky-700 py-3 px-2">
      <div className="container">
        <button className="btn" onClick={operRegisterForm}>
          CreateNewUser
        </button>
      </div>
    </header>
  )
}
