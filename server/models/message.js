import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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
