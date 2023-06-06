import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { UserModel } from '../../models/UserModel'
import spiner from '../../assets/Spinner-5.gif'
import { getUsers } from '../../slices/usersSlice'
import { UserCard } from '../outputs/UserCard'

export const Invitations = () => {

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector<UserModel>(state => state.users.isLoading)
  const currentUser = useAppSelector<UserModel>(state => state.currentUser.user)
  const invitations = useAppSelector<UserModel[]>(state => state.users.container)

  useEffect(()=>{
    console.log('invitation effect');
    currentUser && dispatch(getUsers({_id: currentUser.invitations}))
  },[])



    return (
        <>
        {!isLoading ? 
            !!invitations.length ? 
                <ul className='flex gap-5'>
                  
                </ul>
            :
                <p className='text-xl flex justify-center items-center h-full'>Пока нет приглашений</p>
        :
        <div className='h-full flex justify-center items-center'>
            <img className=' w-24' src={spiner} alt="" />
        </div>
        }
        </>
   
    )
}
