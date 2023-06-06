import { Router } from 'express';
import {
    createChat,
    deleteChat,
    getMyChats
} from '../controllers/chats.js';

const route = new Router();

route.post('/', createChat);
route.delete('/:chatId', deleteChat);
route.get('/my/:userId', getMyChats);

export default route;
