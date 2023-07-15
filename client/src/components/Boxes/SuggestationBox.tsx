import { ContentBox } from '../UI/ContentBox'
import { MappingBox } from '../UI/MappingBox'
import { FriendPreview } from '../outputs/FriendPreview'
import { MenuItem } from '../UI/MenuItem'
import { useAppSelector } from '../../hooks/hooks'
import { UserModel } from '../../models/UserModel'

interface SuggestationBoxProps {
    onWriteMessage: (id: string) => void 
    onCancel: (id: string) => void 
    isShow: boolean
}

export const SuggestationBox = ({
    onWriteMessage,
    onCancel,
    isShow
}: SuggestationBoxProps) => {

    const suggestations = useAppSelector<UserModel[]>(state => state.suggestations.container)


return (
    <ContentBox 
        title='Suggestation'
        className={`absolute md:static md:-translate-y-0 w-full ${isShow ? '-top-[0px]': '-top-[400px] -translate-y-full'}  duration-1000`}
    >
        <MappingBox 
            className='grid gap-3 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-1'
            isLoading = {false}
            isAlternate = {!suggestations.length}
            loadingComponent = 'Loading...'
            alternateComponent = 'Пока нет предложений'
        >
            <ul>
            {suggestations.map(user => (
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
                    itemName='reject'
                    itemText='Отозвать приглашение'
                    onChange={()=>{onCancel(user._id)}}
                />
                </FriendPreview>
            ))}
            </ul>
        </MappingBox>
    </ContentBox>
)
}
