import {io} from '../index.js'
import User from '../models/users.js'


export const userEnter = async (data, socket) => {
    console.log('userEnter');
    console.log(data);
    const {userId} = data
    socket.user = userId
    try{
        socket.join(userId)
        await User.findByIdAndUpdate(userId, {isOnline: true, socketId: socket.id})
        io.emit('userConnected', {user: userId})
    }
    catch(err){
        console.log('userEnter error');
    }
}


export const disconnectUser = async (data, socket) => {
    console.log('quitUser');
    const userId = socket?.user || null
    try{
        if (userId) {
            socket.user = null
            const user = await User.findByIdAndUpdate(userId, {isOnline: false, socketId: ''})
            socket.leave(userId)
            user.chats.forEach(chat => socket.leave(chat))
            io.emit('userDisconnected', {user: userId})
        }
    }
    catch(err){
        console.log('quitUser error');
    }
}

