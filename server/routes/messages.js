import { Router } from 'express';
import {
    getMessages,
    getChatMessages,
    createMessage,
    editMessage,
    deleteMessage,
    readMessage
} from '../controllers/messages.js';

const route = new Router();

route.get('/', getMessages);
route.get('/chat/:chat', getChatMessages);
route.post('/', createMessage);
route.put('/:messageId', editMessage);
route.put('/read/:messageId', readMessage);
route.delete('/:messageId', deleteMessage);


export default route;
