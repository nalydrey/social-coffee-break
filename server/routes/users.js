import { Router } from 'express';
import {
    getUsers,
    createUser,
    getUser,
    editUser,
    deleteUser,
    changeAvatar,
    changePicture,
} from '../controllers/users.js';

const route = new Router();

route.get('/', getUsers);
route.post('/', createUser);
route.get('/:userId', getUser);
route.put('/:userId', editUser);
route.delete('/:userId', deleteUser);
route.put('/img/:userId', changeAvatar);
route.put('/picture/:userId', changePicture);


export default route;
