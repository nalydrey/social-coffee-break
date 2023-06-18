import {io} from '../index.js'
import User from '../models/users.js'


export const userEnter = async (data, socket) => {
    console.log('userEnter');
    console.log(data);
    const {userId} = data
    try{
        socket.join(userId)
        await User.findByIdAndUpdate(userId, {isOnline: true, socketId: socket.id})
        io.emit('userConnected', {user: userId})
    }
    catch(err){
        console.log('userEnter error');
    }
}


export const quitUser = async (data, socket) => {
    console.log('quitUser');
    console.log(data);
    const {userId} = data
    try{
        const user = await User.findByIdAndUpdate(userId, {isOnline: false, socketId: ''})
        socket.leave(userId)
        user.chats.forEach(chat => socket.leave(chat))

        io.emit('userDisconnected', {user: userId})
    }
    catch(err){
        console.log('quitUser error');
    }
}

export const disconnectUser = async (socket) => {
    console.log('disconnectUser');
    try{
        const user = await User.findOneAndUpdate({socketId: socket.id}, {isOnline: false, socketId: ''}, )
        io.emit('userDisconnected', {user: user._id})
      
    }
    catch(err){
        console.log('disconnectUser error');
    }
}