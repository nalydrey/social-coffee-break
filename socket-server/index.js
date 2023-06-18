import express from 'express';
import cors from 'cors';



import http from 'http'
import {Server} from 'socket.io'


const app = express();
const server = http.Server(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})




const PORT = 3020;

app.get('/', (req, res) => {
    res.json({text: 'Hello'})
})


io.on('connection', (socket) => {
    console.log('user connected');
    io.emit('Hello', 'Hello')
    socket.on('disconnect', () => { 'user disconected'})
})

const main = () => {
    try {
        server.listen(PORT, () =>
            console.log(`Server is started on ${PORT} port`)
        );
    } catch (err) {
        console.log('Server was not started ', err);
    }
};

main();
