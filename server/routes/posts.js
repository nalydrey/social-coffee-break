import {Router} from 'express'
import {
    createPost,
    getMyPosts,
    deletePost,
    setLike,
    getPosts
} from '../controllers/posts.js'

const route = new Router()

route.post('/', createPost)
route.get('/my/:userId', getMyPosts)
route.get('/', getPosts)
route.delete('/:postId/:userId', deletePost)
route.put('/like/:postId/:userId', setLike)

export default route