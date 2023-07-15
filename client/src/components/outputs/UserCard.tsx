import React, {ReactNode} from 'react'
import defaultFoto from '../../assets/defaultAva.png'
import { URL } from '../../http'
import { PhotoIcon,  UsersIcon} from '@heroicons/react/24/solid'
import { Score } from '../UI/Score'
import { ImageWithPreloader } from '../UI/ImageWithPreloader'
import { Avatar } from '../UI/Avatar'

interface UserCardProps {
    id: string
    avatar: string
    picture: string
    lastName: string
    firstName: string
    postCounter: number
    children: ReactNode
    friendCounter: number
    isOnline: boolean
}

export const UserCard = ({
    id,
    isOnline,
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
    <li className='max-w-[250px] w-full rounded-lg shadow-light flex flex-col grow'>
        <div className='relative rounded-t-lg h-[110px] bg-green-300 bg-center bg-cover bg-no-repeat'
            //  style={{backgroundImage: `url(${picture ?  URL+'/'+ picture : ''})`}}   
        >
            <ImageWithPreloader className='img absolute rounded-t-lg' src={picture ? URL+picture : ''} alt="foto"/>
            <Avatar
                className='border-4 border-slate-200 shadow-light absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
                classSize='w-32 h-32'
                src = {avatar && URL+'/'+avatar}
            />
           { 
            isOnline &&
            <div className='border w-5 h-5 rounded-full bg-green-600 absolute top-0 -translate-x-1/4 -translate-y-1/4 shadow-light'/>
            }

        </div>
        <div className='pt-16 rounded-b-lg bg-slate-200 p-5 flex flex-col gap-5 grow'>
            <h3 className='text-center text-2xl text-sky-700 font-bold grow'>{firstName} {lastName}</h3>
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
