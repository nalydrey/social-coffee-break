import User from '../models/users.js'


export const sendInvitation = async ({friendId}, socket) => {
    console.log('sendInvitation');
    const currentUserId = socket.user
    try {
        if (currentUserId) {
            //Add friend to currentUser
            const user = await User.findByIdAndUpdate(currentUserId, {$push: {myRequests: friendId}}, {new: 1})
            //Add currentUser to Friend
            await User.findByIdAndUpdate(friendId, {$push: {invitations: currentUserId}})
            socket.to(friendId).emit('userIsInvited', {user})
        }
    } catch (error) {
        console.log('sendInvitation error', error);
    }
} 

export const cancelSuggestation = async ({ friendId}, socket) => {
    console.log('cancelSuggestation');
    const currentUserId = socket.user
    try {
        if (currentUserId) {
            //Add friend to currentUser
            await User.findByIdAndUpdate(currentUserId, {$pull: {myRequests: friendId}})
            //Add currentUser to Friend
            await User.findByIdAndUpdate(friendId, {$pull: {invitations: currentUserId}})
            socket.to(friendId).emit('suggestationIsCanceled', {userId: currentUserId})
        }
    } catch (error) {
        console.log('addToFrejectInvitationriends error', error);
    }
} 

export const rejectInvitation = async ({friendId}, socket) => {
    console.log('rejectInvitation');
    const currentUserId = socket.user
    try {
        if (currentUserId) {
            // Delete invitation from currentUser
            await User.findByIdAndUpdate(currentUserId, {$pull: {invitations: friendId}})
            //Delete request from Friend
            await User.findByIdAndUpdate(friendId, {$pull: {myRequests: currentUserId}})
            socket.to(friendId).emit('invitationIsRejected', {userId: currentUserId})
        }
    } catch (error) {
        console.log('rejectInvitation error', error);
    }
} 

export const acceptInvitation = async ({friendId}, socket) => {
    console.log('acceptInvitation');
    const currentUserId = socket.user
    try {
        if (currentUserId) {
            //Add friend to currentUser to friends and delete invitation 
            const user = await User.findByIdAndUpdate(currentUserId, {$pull: {invitations: friendId}, $push: {friends: friendId}})
            //Delete request from Friend
            await User.findByIdAndUpdate(friendId, {$pull: {myRequests: currentUserId}, $push: {friends: currentUserId}})
            socket.to(friendId).emit('invitationIsAccepted', {user})
        }
    } catch (error) {
        console.log('acceptInvitation error', error);
    }
};

export const deleteFromFriends = async ({friendId}, socket) => {
    console.log('deleteFromFriends');
    const currentUserId = socket.user
    try {
        if (currentUserId) {
            //delete friend from currentUser
            await User.findByIdAndUpdate(currentUserId, {$pull: {friends: friendId}})
            //delete currentUser to Friend
            await User.findByIdAndUpdate(friendId, {$pull: {friends: currentUserId}})
            socket.to(friendId).emit('friendIsDeleted', {userId: currentUserId})
        }
    } catch (error) {
        console.log('deleteFromFriends error', error);
    }
};