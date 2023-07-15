import React, {useState, useEffect, MouseEvent} from 'react'
import { Avatar } from '../UI/Avatar'
import { URL } from '../../http'
import { Tooltip } from '../UI/Tooltip'
import { MenuItem } from '../UI/MenuItem'

interface UserLabelProps {
    firstName: string
    avatar: string
    onProfile: (name: string)=>void
    onLogout: (name: string)=>void
}

export const UserLabel = ({
    firstName,
    avatar,
    onProfile,
    onLogout
}: UserLabelProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)


    useEffect(() => {
        document.addEventListener('click', closeMenu)
        return () => {
          document.removeEventListener('click', closeMenu)
        }
    }, [])

    const closeMenu = () => {
    setIsOpen(false)
    }

    const handlerUserMenu = (e: MouseEvent) => {
    e.stopPropagation()
    setIsOpen(true)
    }


  return (
    <div className='relative'>
        <div className='flex items-center gap-2 mx-2 cursor-pointer'
            onClick={handlerUserMenu}
        >
            <p className='font-bold text-gray-300'>Hello, {firstName}</p>
            <Avatar
                className=' shadow-light'
                src = {avatar && URL + '/' + avatar}
            />
        </div>
        <Tooltip
            className="top-[120%] right-0"
            isOpen = {isOpen}  
          >
            <ul>
              <MenuItem
                itemText={'Profile'}
                itemName='profile'
                onChange={onProfile}
              />
              <MenuItem
                itemText={'Log Out'}
                itemName='logOut'
                onChange={onLogout}
              />
            </ul>
        </Tooltip>

    </div>
  )
}
