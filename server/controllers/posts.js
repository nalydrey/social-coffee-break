import Post from '../models/post.js'
import User from '../models/users.js'
import fs from 'fs'


export const createPost = async(req, res) => {
    try{
        console.log('create post');
        console.log(req.body);
        // console.log(req.files);
        const {name, discription, user} = req.body
        const files = req.files
        const images = []
        if(files){
            Object.values(req.files).map(image => {
                const fileName = Date.now().toString() + image.name
                image.mv('uploads/'+fileName)
                images.push(fileName)
            })
        }
        let post = new Post({
            name, discription, images, user
        })
        await User.findByIdAndUpdate(user, {$push: {posts: post._id}} )
        await (await post.save()).populate('user', 'private.avatar private.firstName private.lastName')
        res.json({post})
    }
    catch(err){
        console.log('error create post', err);
    }
}

export const getPosts = async(req, res) => {
    try{
        console.log('getPosts');
        console.log(req.params);
        const {userId} = req.params
        const posts = await Post.find().sort({createdAt:-1}).populate('user', 'private.avatar private.firstName private.lastName')
        console.log(posts);
        res.json({posts})
    }
    catch(err){
        console.log('error getPosts', err);
    }
}

export const getMyPosts = async(req, res) => {
    try{
        console.log('getMyPosts');
        console.log(req.params);
        const {userId} = req.params
        const posts =await Post.find({user: userId}).sort({createdAt:-1}).populate('user', 'private.avatar private.firstName private.lastName')
        console.log(posts);
        res.json({posts})
    }
    catch(err){
        console.log('error getMyPosts', err);
    }
}

export const deletePost = async(req, res) => {
    try{
        console.log('deletePost');
        console.log(req.params);
        const {postId, userId} = req.params
        await User.findByIdAndUpdate(userId, {$pull: {posts: postId}})
        const post =await Post.findByIdAndDelete(postId)
        console.log(post);
        //Delete images
        post.images.forEach(image => {
            fs.existsSync('uploads/'+image)
            if(fs.existsSync('uploads/'+image)){
                fs.unlink('uploads/'+image, (err) => {
                    err ? console.log('error') : console.log('images deleted');
                })
            }
        })

        res.json({isDelete: true})
    }
    catch(err){
        console.log('deletePost error', err);
        res.json({isDelete: false})

    }
}

export const setLike = async (req, res) => {
    try{
        console.log('setLike')
        console.log(req.body);
        const {isLike} = req.body
        console.log(req.params);
        const {userId, postId} = req.params
        const post = await Post.findById(postId)
        // console.log(post);
        // console.log(post.likes.includes(userId));
        // console.log(post.dis.includes(userId));
        if(isLike){
           //Удалить дизлайк
           console.log('existLike ', post.likes.includes(userId));
           if(post.likes.includes(userId)){
               //Убрать лайк если есть
               const post = await Post.findByIdAndUpdate(postId, {$pull: {dislikes: userId, likes: userId}})
           }
           else{
               //Добавить лайк если его нет
               const post = await Post.findByIdAndUpdate(postId, {$pull: {dislikes: userId}, $push:{likes: userId}})
           }
        }
        else{
             //Удалить лайк
           console.log('existLike ', post.likes.includes(userId));
           if(post.dislikes.includes(userId)){
               //Убрать дизлайклайк если есть
               const post = await Post.findByIdAndUpdate(postId, {$pull: {likes: userId, dislikes: userId}})
           }
           else{
               //Добавить дизлайклайк если его нет
               const post = await Post.findByIdAndUpdate(postId, {$pull: {likes: userId}, $push:{dislikes: userId}})
           }
        }

        res.json({isChange: true})
    }
    catch(err){
        console.log('error setLike', err);
        res.json({isChange: false})
    }
}