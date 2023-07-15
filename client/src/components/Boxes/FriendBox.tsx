import { ContentBox } from '../UI/ContentBox'
import { MappingBox } from '../UI/MappingBox'
import { useAppSelector } from '../../hooks/hooks'
import type { UserModel } from '../../models/UserModel'
import { FriendPreview } from '../outputs/FriendPreview'
import { MenuItem } from '../UI/MenuItem'

interface FriendBoxProps {
    onWriteMessage: (id: string) => void 
    onDeleteFromFriends: (id: string) => void 
    isShow: boolean
}

export const FriendBox = ({
    onWriteMessage, 
    onDeleteFromFriends,
    isShow=false 
}: FriendBoxProps) => {

  const friends = useAppSelector<UserModel[]>(state => state.friends.container)

 




  return (
    <ContentBox 
        title='Friends'
        className={`absolute md:static md:-translate-y-0 w-full  ${isShow ? 'top-[0px]': '-top-[400px] -translate-y-full'}  duration-1000`}
    >
        <MappingBox 
            className='w-full'
            isLoading = {false}
            isAlternate = {!friends.length}
            loadingComponent = 'Loading...'
            alternateComponent = 'Пока нет друзей'
        >
        <ul className='grid gap-3 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-1'>
            {
            friends.map(user => (
                <FriendPreview
                key={user._id}
                avatar={user.private.avatar}
                picture={user.picture}
                title={`${user.private.firstName} ${user.private.lastName}`}
                >
                    <ul>
                        <MenuItem
                            itemName='message'
                            itemText='Написать сообщение'
                            onChange={()=>{onWriteMessage(user._id)}}
                        />
                        <MenuItem
                            itemName='delete'
                            itemText='Удалить из друзей'
                            onChange={()=>{onDeleteFromFriends(user._id)}}
                        />
                    </ul>
                </FriendPreview>
            ))
            }
        </ul>
        </MappingBox>
        </ContentBox>
  )
}
