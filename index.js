
import { createServer } from "http";
import express from "express";
import path from "path";
import {Server as SocketServer} from "socket.io";
const app = express();

const server = createServer (app);
const io = new SocketServer(server);
 
app.use(express.static(path.resolve('./public')))
 
io.on('connection', socket => {
    console.log('Socket Connected', socket.id);
    socket.on('binaryStream', data => {
        console.log('Binary Stream Incoming');
    });
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
