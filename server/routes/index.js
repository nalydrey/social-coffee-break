import { Router } from 'express'
import userRoute from './users.js'
import chatRoute from './chats.js'
import postsRoute from './posts.js'
import messageRoute from './messages.js'

const route = new Router();


route.use('/posts', postsRoute)
route.use('/users', userRoute);
route.use('/chats', chatRoute);
route.use('/messages', messageRoute);

export default route;
