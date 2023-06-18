import express from 'express';
import mongoose from 'mongoose';
import fileUpLoad from 'express-fileupload'
import { config } from 'dotenv';
import rootRoute from './routes/index.js';
import cors from 'cors';

import Chat from './models/chat.js'
import Message from './models/message.js'
import User from './models/users.js'

import {
    userEnter,
    quitUser,
    disconnectUser
} from './socketControllers/users.js';

import http from 'http'
import {Server} from 'socket.io'
import { createMessage, deleteMessage, readMessage } from './socketControllers/messages.js';
import { connectChats, createNewChat, joinToChat, deleteChat } from './socketControllers/chats.js';

config();

const app = express();
const server = http.Server(app)

export const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
})




const PORT = process.env.PORT;



app.use(cors());
app.use(express.json());
app.use(express.static('uploads'))
app.use(fileUpLoad())
app.use(rootRoute);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('enterUser', (data) => { userEnter(data, socket)} )
    socket.on('quitUser', (data) => { quitUser(data, socket)})
    socket.on('sendMessage', async (data) => { createMessage(data, socket) })
    socket.on('connectChats', (data) => { connectChats(data, socket) })
    socket.on('joinToChat', (data) => { joinToChat(data, socket)})
    socket.on('createNewChat', async (data) => { createNewChat(data, socket)})  
    socket.on('readMessage', async (data) => { readMessage(data, socket)})  
    socket.on('deleteMessage', async (data) => { deleteMessage(data, socket)})  
    socket.on('deleteChat', async (data) => { deleteChat(data, socket)})  


    socket.on('disconnect', () => {disconnectUser(socket)})
})

const main = () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/social-network');

        server.listen(PORT, () =>
            console.log(`Server is started on ${PORT} port`)
        );
    } catch (err) {
        console.log('Server was not started ', err);
    }
};

main();
