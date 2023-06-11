import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        createdId: {
            type: String,
            require: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        isRead: {
            type: Boolean,
            default: false
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        },
        text: String,
    },
    { timestamps: true }
);

export default mongoose.model('Message', messageSchema);
