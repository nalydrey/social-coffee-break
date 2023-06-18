import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        private: {
            firstName: {
                type: String,
                default: '',
            },
            lastName: {
                type: String,
                default: '',
            },
            nikName: {
                type: String,
                default: '',
            },
            age: {
                type: Number,
                default: null,
            },
            gender: {
                type: String,
                default: '',
            },
            password: {
                type: String,
                require: true,
            },
            avatar: {
                type: String,
                default: '',
            },
        },
        picture: {
            type: String,
            default: '',
        },
        myRequests: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        invitations: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        infoMessages: [String],
        isOnline: {
            type: Boolean,
            default: true
        },
        socketId: {
            type: String,
            default: ''
        },
        contacts: {
            email: {
                type: String,
                require: true,
            },
            tel: {
                type: String,
                default: '',
            },
        },
        chats: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Chat',
            },
        ],
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post'
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
