import { Avatar } from '../../UI/Avatar'

interface ChatHeaderProps {
    avatar: string
    isOnline: boolean
    chatName: string
}

export const ChatHeader = ({
    avatar,
    isOnline,
    chatName
}: ChatHeaderProps) => {
  return (
    <div className='flex py-1 px-5 items-center border-b-4 border-sky-800'>
        <div className='relative mb-1'>
            <Avatar 
                src={avatar}
                className='shadow-light'
            />
            {
                isOnline &&    
                <div className='absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 w-3 h-3 rounded-full bg-green-600'/>
            }
        </div>
        <p className='grow text-center text-2xl font-bold text-sky-700'>
            {chatName}
        </p>
    </div>
  )
}
