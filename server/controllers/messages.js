import Message from '../models/message.js'
import Chat from '../models/chat.js'

export const getChatMessages = async (req, res) => {
    try {
        console.log('getMessages');
        console.log(req.params);
        const {chat} = req.params
        const messages = await Message.find({chat}).populate('user', 'private.avatar')
        console.log(messages);
        res.json({messages})

    } catch (error) {
        console.log('getMessages error', error);
    }
};
export const getMessages = async (req, res) => {
    try {
        console.log('getMessage');
    } catch (error) {
        console.log('getMessage error', error);
    }
};
export const createMessage = async (req, res) => {
    try {
        console.log('createMessage');
        console.log(req.body)
        const {createdId, user, chat, text} = req.body
        const newMessage = new Message({createdId, user, chat, text})
        await newMessage.save()
        //Add message to chat
        const message = await Message.findById(newMessage._id).populate('user', 'private.avatar')
        res.json({message})
    } catch (error) {
        console.log('createMessage error', error);
    }
};

export const editMessage = async (req, res) => {
    try {
        console.log('editMessage');
    } catch (error) {
        console.log('editMessage error', error);
    }
};

export const readMessage = async (req, res) => {
    try {
        console.log('readMessage');
        const {messageId} = req.params
        console.log(messageId);
        const message = await Message.findByIdAndUpdate(messageId, {$set: {isRead: true}}, {new: 1})
        console.log(message);
        res.json({message})
    } catch (error) {
        console.log('readMessage error', error);
        res.json({error: 'status is not changed'})
    }
};

export const deleteMessage = async (req, res) => {
    try {
        console.log('deleteMessage');
        const {messageId} = req.params
        const message = await Message.findByIdAndDelete(messageId)
        res.json({isDelete: true})
    } catch (error) {
        console.log('deleteMessage error', error);
        res.json({isDelete: false})
    }
};
