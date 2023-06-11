import React from 'react'

interface SkeletonProps {
    className: string
}

export const Skeleton = ({className}: SkeletonProps) => {
  return (
    <div className={`${className} bg-gradient-to-r from-gray-400  to-gray-600 bg-1000% animate-gradient`}></div>  )
}
