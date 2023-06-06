import React from 'react'

interface MenuItemProps {
    itemText: string | number
    itemName: string
    onChange: (itemName: string)=>void
}

export const MenuItem = ({
    itemText,
    itemName,
    onChange = ()=>{}
}: MenuItemProps) => {


  return (
    <li className='group flex flex-col items-center border-b border-gray-300 cursor-pointer'
        onClick={() => onChange(itemName)}
    >
        <p className=' whitespace-nowrap text-center text-lg font-medium px-5 py-1'>{itemText}</p>
        <div className={`h-[3px] bg-sky-700 rounded-xl duration-200 w-0 group-hover:w-full `}></div>
    </li>
  )
}
