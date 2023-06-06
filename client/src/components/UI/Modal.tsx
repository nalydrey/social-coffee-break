import React from 'react'

interface ModalProps {
    children: React.ReactNode
    isActive: boolean
    onEmptySpace?: ()=>void
}

export const Modal = ({
    isActive,
    children, 
    onEmptySpace=()=>{}
}: ModalProps) => {
  return (
    <div 
        className={`absolute top-0 left-0 w-screen h-screen bg-black/80 justify-center items-center  ${isActive ? 'flex':'hidden'}`}
        onClick = {()=>{onEmptySpace()}} 
    >
        <div className=''
             onClick={(e)=>{e.stopPropagation()}}   
        >
            {children}
        </div>
    </div>
  )
}
