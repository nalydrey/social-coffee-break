import Message from '../models/message.js'

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


export const editMessage = async (req, res) => {
    try {
        console.log('editMessage');
    } catch (error) {
        console.log('editMessage error', error);
    }
};


