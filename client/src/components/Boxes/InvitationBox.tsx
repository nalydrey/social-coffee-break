import { ContentBox } from '../UI/ContentBox'
import { MappingBox } from '../UI/MappingBox'
import { FriendPreview } from '../outputs/FriendPreview'
import { MenuItem } from '../UI/MenuItem'
import { useAppSelector } from '../../hooks/hooks'
import type { UserModel } from '../../models/UserModel'

interface InvitationBoxProps {
    onWriteMessage: (id: string) => void 
    onAccept: (user: UserModel) => void 
    onReject: (id: string) => void 
    isShow: boolean
}

export const InvitationBox = ({
    onWriteMessage,
    onAccept,
    onReject,
    isShow
}: InvitationBoxProps) => {

    const invitations = useAppSelector<UserModel[]>(state => state.invitations.container)


    return (
    <ContentBox 
        title='Invitation' 
        className={`absolute md:static md:-translate-y-0 w-full  ${isShow ? 'top-[0px]': '-top-[400px] -translate-y-full'}  duration-1000`}
    >
        <MappingBox 
            className='grid gap-3 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-1'
            isLoading = {false}
            isAlternate = {!invitations.length}
            loadingComponent = 'Loading...'
            alternateComponent = 'Пока нет приглашений'
        >
            <ul>
            {invitations.map(user => (
                <FriendPreview
                    key={user._id}
                    avatar={user.private.avatar}
                    picture={user.picture}
                    title={`${user.private.firstName} ${user.private.lastName}`}
                >
                <MenuItem
                    itemName='message'
                    itemText='Написать сообщение'
                    onChange={()=>{onWriteMessage(user._id)}}
                />
                <MenuItem
                    itemName='add'
                    itemText='Принять приглашение'
                    onChange={()=>{onAccept(user)}}
                />
                <MenuItem
                    itemName='reject'
                    itemText='Отклонить приглашение'
                    onChange={()=>{onReject(user._id)}}
                />
                </FriendPreview>
            ))}
            </ul>
        </MappingBox>
        
    </ContentBox>
  )
}
