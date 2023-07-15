import React, {ReactNode} from 'react'

interface CenterProps {
    children: ReactNode
    className?: string
}

export const Center = ({
    children,
    className
}: CenterProps) => {
  return (
    <div className={`${className} flex justify-center items-center grow bg-gray-300`}>{children}</div>
  )
}
