import type { UserModel } from "./models/UserModel"
import { getMyChats } from "./slices/chatSlice"
import { getFriends } from "./slices/friendSlice"
import { getInvitations } from "./slices/invitationSlice"
import { getSuggestations } from "./slices/suggestationSlice"
import type { AppDispatch } from "./store/store"


type FirsTLoadsFunc = (dispatch: AppDispatch, currentUser: UserModel) => void

export const userLoads: FirsTLoadsFunc = (dispatch, currentUser) => {
    
    dispatch(getMyChats(currentUser._id))
    dispatch(getFriends(currentUser.friends)) 
    dispatch(getInvitations(currentUser.invitations)) 
    dispatch(getSuggestations(currentUser.myRequests)) 


}