import React, {ReactNode} from 'react'

interface MappingBoxProps {
    className?: string
    isLoading: boolean
    isAlternate: boolean
    loadingComponent: ReactNode | string
    alternateComponent: ReactNode | string
    children: ReactNode

}

export const MappingBox = ({
    className,
    isLoading,
    isAlternate,
    loadingComponent,
    alternateComponent,
    children,
}: MappingBoxProps) => {

    console.log();
    


  return (
    <div className={`${className} rounded-md p-3`}>
        { 
            isLoading ?
            <div className='flex justify-center items-center h-full text-lg font-medium text-gray-500'>{loadingComponent}</div>
            :
            <>
            {
                isAlternate ?
                <div className='flex flex-col h-full justify-center items-center text-lg font-medium text-gray-500'>{alternateComponent}</div>
                :
                <>{children}</>
            }
            </>
        }
    </div>
  )
}
