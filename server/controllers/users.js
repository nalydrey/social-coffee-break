import { log } from 'console';
import User from '../models/users.js';
import fs from 'fs'



export const getUsers = async (req, res) => {
    console.log('params', req.query);

    const query = req.query

    try {
        console.log('getUsers');
        const users = await User.find(query)
        res.json({users})

    } catch (error) {
        console.log('getUsers error', error);
        res.json({error: 'getUsers error'})
    }
};

export const getUser = async (req, res) => {
    try {
        console.log('getUser');
        const {userId} = req.params
        const user = await User.findById(userId)
            
        res.json({user})

    } catch (error) {
        console.log('getUser error', error);
    }
};

export const createUser = async (req, res) => {
    try {
        console.log('createUser');
        const { firstName, lastName, email, password } = req.body;
        const user = new User({
            private: {
                firstName,
                lastName,
                password
            },
            contacts: {
                email,
            },
        });
        const newUser = await user.save();
        res.json({user: newUser});
    } catch (error) {
        console.log('createUser error', error);
    }
};

export const editUser = async (req, res) => {
    try {
        console.log('editUser');
        console.log(req.params);
        console.log(req.body);
        const {userId} = req.params
        const {firstName, lastName, nikName, age, gender, tel, email} = req.body
        const user =await User.findByIdAndUpdate(userId, { $set: {
            'private.firstName': firstName,
            'private.lastName': lastName,
            'private.nikName': nikName,
            'private.age': age,
            'private.gender': gender,
            'contacts.tel': tel,
            'contacts.email': email
        }
        }, {new: 1})
        
        res.json({user})

        
    } catch (error) {
        console.log('editUser error', error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        console.log('deleteUser');
        const {userId} = req.params
        const deletedUser = await User.findByIdAndDelete(userId)
        console.log(deletedUser);
        const oldPicture = deletedUser.picture || 'some'
        const oldAvatar = deletedUser.private.avatar || 'some'
        if (fs.existsSync(`uploads/${oldAvatar}`)) {
            fs.unlink(`uploads/${oldAvatar}`, (err)=>{
                if(err){
                    console.log('error while deleting old file')
                    return res.json({error: true})
                    }
                else{
                    console.log('file is deleted');
                }
            })
        }
        if (fs.existsSync(`uploads/${oldPicture}`)) {
            fs.unlink(`uploads/${oldPicture}`, (err)=>{
                if(err){
                    console.log('error while deleting old file')
                    return res.json({error: true})
                    }
                else{
                    console.log('file is deleted');
                }
            })
        }

        res.json({deletedUser})
    } catch (error) {
        console.log('deleteUser error', error);
    }
};



export const changeAvatar = async (req, res) => {
    
    try {
        console.log('changeAvatar');
        const file = req.files.avatar
        // console.log(req.files);
        const userId = req.params.userId
        if(file){
            // console.log(file);
            //Удаление старого файла
            const userPrivate = await User.findById(userId, {private: 1})
            const oldAvatar = userPrivate.private.avatar || 'some'
            if (fs.existsSync(`uploads/${oldAvatar}`)) {
                fs.unlink(`uploads/${oldAvatar}`, (err)=>{
                    if(err){
                        console.log('error while deleting old file')
                        return res.json({error: true})
                        }
                    else{
                        console.log('file is deleted');
                    }
                })
            }

            //Запись нового
            const avatar = Date.now().toString()+file.name 
            file.mv('uploads/'+ avatar)
            await User.findByIdAndUpdate(userId, {$set: {'private.avatar': avatar }})
            return res.json({avatar})
        }
        res.json({avatar: ''})
    } catch (error) {
        console.log('changeAvatar error', error);
    }
};

export const changePicture = async (req, res) => {
    try {
        console.log('changePicture');
        const file = req.files.picture
        // console.log(req.files);
        const userId = req.params.userId
        if(file){
            console.log(file);
            //Удаление старого файла
            const userPrivate = await User.findById(userId, {picture: 1})
            const oldPicture = userPrivate.picture || 'some'
            if (fs.existsSync(`uploads/${oldPicture}`)) {
                fs.unlink(`uploads/${oldPicture}`, (err)=>{
                    if(err){
                        console.log('error while deleting old file')
                        return res.json({error: true})
                        }
                    else{
                        console.log('file is deleted');
                    }
                })
            }
            //Запись нового
            const picture = Date.now().toString()+file.name 
            file.mv('uploads/'+ picture)
            await User.findByIdAndUpdate(userId, {$set: {picture}})
            return res.json({picture})
        }
        res.json({avatar: ''})
    } catch (error) {
        console.log('changePicture error', error);
    }
};


//////////////////////////////////////////////////////////////////////////////////////////////////////

export const addToFriends = async (req, res) => {
    try {
        console.log('addToFriends');
        console.log(req.params);
        const {friendId, userId} = req.params
        //Add friend to currentUser
        await User.findByIdAndUpdate(userId, {$push: {myRequests: friendId}})
        //Add currentUser to Friend
        const user = await User.findByIdAndUpdate(friendId, {$push: {invitations: userId}}, {new: 1})

        res.json({user})
       
    } catch (error) {
        console.log('addToFriends error', error);
        res.json({isAdd: false})
    }
};

export const deleteFromFriends = async (req, res) => {
    try {
        console.log('deleteFromFriends');
        console.log(req.params);
        const {friendId, userId} = req.params
        //delete friend from currentUser
        await User.findByIdAndUpdate(userId, {$pull: {friends: friendId}})
        //delete currentUser to Friend
        const user = await User.findByIdAndUpdate(friendId, {$pull: {friends: userId}}, {new: 1})

        res.json({user})
       
    } catch (error) {
        console.log('deleteFromFriends error', error);
        res.json({isAdd: false})
    }
};

export const cancelAdditionFriends = async (req, res) => {
    try {
        console.log('addToFriends');
        console.log(req.params);
        const {friendId, userId} = req.params
        //Add friend to currentUser
        await User.findByIdAndUpdate(userId, {$pull: {myRequests: friendId}})
        //Add currentUser to Friend
        const user = await User.findByIdAndUpdate(friendId, {$pull: {invitations: userId}})

        res.json({user})
       
    } catch (error) {
        console.log('addToFriends error', error);
        res.json({isCancel: false})
    }
};



export const acceptInvitation = async (req, res) => {
    try {
        console.log('acceptInvitation');
        console.log(req.params);
        const {friendId, userId} = req.params
        //Add friend to currentUser to friends and delete invitation 
        await User.findByIdAndUpdate(userId, {$pull: {invitations: friendId}, $push: {friends: friendId}})
        //Delete request from Friend
        const user = await User.findByIdAndUpdate(friendId, {$pull: {myRequests: userId}, $push: {friends: userId}}, {new:1})
        res.json({user})
       
    } catch (error) {
        console.log('acceptInvitation error', error);
        res.json({isAdd: false})

    }
};

export const rejectInvitation = async (req, res) => {
    try {
        console.log('rejectInvitation');
        console.log(req.params);
        const {friendId, userId} = req.params
        // Delete invitation from currentUser
        await User.findByIdAndUpdate(userId, {$pull: {invitations: friendId}})
        //Delete request from Friend
        const user = await User.findByIdAndUpdate(friendId, {$pull: {myRequests: userId}})

        res.json({user})

       
    } catch (error) {
        console.log('rejectInvitation error', error);
        res.json({isDelete: false})

    }
};










