import Chat from '../models/chat.js'
import User from '../models/users.js'
import Message from '../models/message.js'


export const createChat = async (req, res) => {
    try {
        console.log('createChat');
        console.log(req.body);
        const {users} = req.body
        //Создать чат
        const chat = new Chat({users}) 
        await chat.save()
        //Записать его участникам чата
        await User.updateMany({_id: users}, {$push: {chats: chat}})
        console.log(chat);
        res.json({chat})

    } catch (error) {
        console.log('createChat error', error);
    }
};
export const deleteChat = async (req, res) => {
    try {
        console.log('deleteChat');
        const {chatId} = req.params
        //Delete chat
        console.log(chatId);
        const chat = await Chat.findByIdAndDelete(chatId)
        console.log(chat);
        //Delete messages belong to shat
        await Message.deleteMany({chat})
        //Delete chat from Users
        const users = await User.updateMany({_id: chat.users}, {$pull: {chats: chatId}})
        console.log(users);
        res.json({isDelete: true, users})

    } catch (error) {
        console.log('deleteChat error', error);
    }
};

export const getMyChats = async (req, res) => {
    try {
        console.log('getMyChats');
        const userId = req.params.userId
        const chats = await Chat.find({users: userId}).populate('users', 'private.avatar private.firstName')
        res.json({chats})

    } catch (error) {
        console.log('getMyChats error', error);
    }
};