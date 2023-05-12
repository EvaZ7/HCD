import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
// import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 4300;
const server = http.createServer(app);
const io = new Server(server);

// create history variable
const historySize = 50
let history = []

// app.use(cookieParser());
//serve static files from the public
app.use(express.static(path.resolve('public')));

//if the socket is connected do this
io.on('connection', (socket) => {
    console.log('a user connected');
    io.to(socket.id).emit('history', history)

    // data variable from input field in chat message
    socket.on('chat', (data) => {
        console.log(data);

        while (history.length > historySize) {
            history.shift()
          }
          history.push(data)

        //data from script.js (name and message)
        io.sockets.emit("chat", data);
    });

    // // data variable from input field in chat message
    // socket.on('typing', (inputName) => {
    //     console.log("Aan het typen");
    //     //broadcast shows the content to all users except the newly created user which is you (event and data from input field)
    //     socket.broadcast.emit("typing", inputName);
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});