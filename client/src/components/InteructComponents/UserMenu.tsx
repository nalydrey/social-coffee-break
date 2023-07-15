
import React, {useState, useEffect, MouseEvent} from 'react'
import { RoundButton } from '../UI/RoundButton'
import { Tooltip } from '../UI/Tooltip'
import { MenuItem } from '../UI/MenuItem'
import { UserIcon } from '@heroicons/react/24/solid'

interface UserMenuProps {
    onLogin: (name: string) => void
    onRegister: (name: string) => void
}




export const UserMenu = ({
    onLogin,
    onRegister
}:UserMenuProps) => {

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
    <div className="relative">
          <RoundButton
              icon={<UserIcon className="w-6 h-6 text-white"/>}
              onClick={handlerUserMenu}
          />
          <Tooltip
            className="top-[120%] right-0"
            isOpen = {isOpen}  
          >
            <ul>
              <MenuItem
                itemText={'Registration'}
                itemName='register'
                onChange={onRegister}
              />
              <MenuItem
                itemText={'Login'}
                itemName='login'
                onChange={onLogin}
              />
            </ul>
          </Tooltip>
        </div>
  )
}
