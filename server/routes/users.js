import { Router } from 'express';
import {
    getUsers,
    createUser,
    getUser,
    editUser,
    deleteUser,
    changeAvatar,
    addToFriends,
    acceptInvitation,
    rejectInvitation,
    changePicture,
    cancelAdditionFriends,
    deleteFromFriends
} from '../controllers/users.js';

const route = new Router();

route.get('/', getUsers);
route.post('/', createUser);
route.get('/:userId', getUser);
route.put('/:userId', editUser);
route.delete('/:userId', deleteUser);
route.put('/img/:userId', changeAvatar);
route.put('/picture/:userId', changePicture);

route.put('/friends/add/:friendId/:userId', addToFriends);
route.put('/friends/delete/:friendId/:userId', deleteFromFriends)
route.put('/friends/cancel/:friendId/:userId', cancelAdditionFriends);
route.put('/friends/accept/:friendId/:userId', acceptInvitation)
route.put('/friends/reject/:friendId/:userId', rejectInvitation)

export default route;
