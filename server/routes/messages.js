import { Router } from 'express';
import {
    getChatMessages,
    editMessage,
} from '../controllers/messages.js';

const route = new Router();

route.get('/chat/:chat', getChatMessages);
route.put('/:messageId', editMessage);


export default route;
