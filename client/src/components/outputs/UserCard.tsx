import React, {ReactNode} from 'react'
import defaultFoto from '../../assets/defaultAva.png'
import { URL } from '../../http'
import { PhotoIcon,  UsersIcon} from '@heroicons/react/24/solid'
import { Score } from '../UI/Score'

interface UserCardProps {
    id: string
    avatar: string
    picture: string
    lastName: string
    firstName: string
    postCounter: number
    children: ReactNode
    friendCounter: number
}

export const UserCard = ({
    id,
    avatar,
    picture,
    children,
    lastName,
    firstName,
    postCounter,
    friendCounter,
}: UserCardProps) => {

    const iconSizeClass = 'w-8 h-8'


  return (
    <li className='max-w-[250px] rounded-lg shadow-light   grow'>
        <div className='relative rounded-t-lg h-[110px] bg-green-300 bg-center bg-cover bg-no-repeat'
             style={{backgroundImage: `url(${picture ?  URL+'/'+ picture : ''})`}}   
        >
            <div className='border-4 border-slate-200 shadow-light absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2  overflow-hidden rounded-full w-32 h-32'>
                <img className='img' src={avatar ? URL+'/'+avatar : defaultFoto} alt="foto" />
            </div>
        </div>
        <div className='pt-16 rounded-b-lg bg-slate-200 p-5 flex flex-col gap-5'>
            <h3 className='text-center text-2xl text-sky-700 font-bold'>{firstName} {lastName}</h3>
            <div className='flex justify-around'>
                <Score
                    title='Friends'
                    icon={<UsersIcon className={`${iconSizeClass} text-orange-500`}/>}
                    counter = {friendCounter}
                />
                <Score
                    title='Posts'
                    icon={<PhotoIcon className={`${iconSizeClass} text-green-500`}/>}
                    counter = {postCounter}
                />
            </div>
            <div className='flex justify-around'>
                {children}    
            </div>
        </div>
    </li>
  )
}
