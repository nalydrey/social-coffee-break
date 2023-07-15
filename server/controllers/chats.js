import Chat from '../models/chat.js'
import Message from '../models/message.js'


export const getMyChats = async (req, res) => {
    try {
        console.log('getMyChats');
        const userId = req.params.userId
        const chats = await Chat.find({users: userId}).populate('users', 'private.avatar private.firstName private.lastName')

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