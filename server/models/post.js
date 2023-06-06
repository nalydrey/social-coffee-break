import mongoose, {Schema} from 'mongoose'


const postSchema = new Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String,
        discription: String,
        images: [String],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        views: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

export default mongoose.model('Post', postSchema)