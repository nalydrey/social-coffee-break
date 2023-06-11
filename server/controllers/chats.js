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

        const addTotal = async (elem) => {
            const count = await Message.find({chat: elem._id, isRead: false}).countDocuments()
            elem._doc.unreadMessageCount = count
            return elem
        }


        const chatsUpd = await Promise.all(chats.map(async chat => {
            const count = await Message.find({chat: chat._id, user: {$ne: userId}, isRead: false}).countDocuments()
            chat._doc.unreadMessageCount = count
            return chat
        }
            ))

        res.json({chats: chatsUpd})


    } catch (error) {
        console.log('getMyChats error', error);
    }
};