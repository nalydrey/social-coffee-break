import { Router } from 'express';
import {
    getMyChats
} from '../controllers/chats.js';

const route = new Router();

route.get('/my/:userId', getMyChats);

export default route;
