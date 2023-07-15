import {io} from '../index.js'
import Message from '../models/message.js'

export const createMessage = async (data, socket) => {
    console.log('createMessage')
    console.log('socket user', socket.user);
    try {
    console.log(data);
    const user = socket.user
    if (user) {
        const {createdId, chat, text} = data
        const newMessage = new Message({createdId, user, chat, text})
        await newMessage.save()
        console.log('user ', user);
        //Add message to chat
        const message = await Message.findById(newMessage._id).populate('user', 'private.avatar')
        io.to(chat).emit('messageIsCreated', message) 
    }
    } catch (error) {
        console.log('createMessage error', error);
    }
}

export const readMessage = async ({messageId, chatId}, socket) => {
    console.log('readMessage');
    try {
        await Message.findByIdAndUpdate(messageId, {$set: {isRead: true}}, {new: 1})
        socket.to(chatId).emit('messageIsRead', messageId)
    } catch (error) {
        console.log('readMessage error', error);
    }
};

export const deleteMessage = async ({messageId, chatId}, socket) => {
    console.log('deleteMessage');
    try {
        const message = await Message.findByIdAndDelete(messageId)
        io.to(chatId).emit('messageIsDeleted', message)
    } catch (error) {
        console.log('deleteMessage error', error);
    }
};