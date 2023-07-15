import {io} from '../index.js'
import Chat from '../models/chat.js'
import User from '../models/users.js'
import Message from '../models/message.js'


export const connectChats = ({chats}, socket) => {
    console.log('connect ', {chats});
    console.log(socket.rooms);
    chats.forEach(chat => socket.join(chat))
}

export const joinToChat = ({chatId}, socket) => {
    console.log('joinToChat ', chatId );
    socket.join(chatId)
}

export const createNewChat = async ({userReceiver}, socket) => {
    console.log('createChat');
    const userTransmitter = socket.user
    try {
        if (userTransmitter) {
            //Создать чат
            const chat = new Chat({users: [userTransmitter, userReceiver]})
            await chat.save()
            const popChat = await Chat.findById(chat).populate('users', 'private.avatar private.firstName') 
            console.log(chat);
            popChat._doc.unreadMessageCount = 0
            //Записать его участникам чата
            await User.updateMany({_id: [userTransmitter, userReceiver]}, {$push: {chats: chat}})
            io.to(userTransmitter).to(userReceiver).emit('chatIsCreated', {chat: popChat})
        }
    } catch (error) {
        console.log('createChat error ', error);
    }
}

export const deleteChat = async ({chatId}, socket) => {
    console.log('deleteChat');
    try {
        //Delete chat
        const chat = await Chat.findByIdAndDelete(chatId)
        //Delete messages belong to shat
        await Message.deleteMany({chat})
        //Delete chat from Users
        await User.updateMany({_id: chat.users}, {$pull: {chats: chatId}})
        console.log(socket.rooms, chatId);
        io.to(chatId).emit('chatIsDeleted', chatId)

    } catch (error) {
        console.log('deleteChat error', error);
    }
};

