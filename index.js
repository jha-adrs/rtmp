
import { createServer } from "http";
import express from "express";
import path from "path";
import { Server as SocketServer } from "socket.io";
import { spawn } from 'child_process'
const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', 128000 / 4,
    '-f', 'flv',
    `rtmp://a.rtmp.youtube.com/live2/`,
];

const ffmpegProcess = spawn('ffmpeg', options);
ffmpegProcess.stdout.on('data', (data)=>{
    console.log(`ffmped stdout: ${data.toString()}`);
})
ffmpegProcess.stderr.on('data', (data)=>{
    console.error(`ffmped stderr: ${data.toString()}`);
})  
ffmpegProcess.on('close', (code)=>{
    console.log(`ffmped child process exited with code ${code}`);
})
const app = express();

const server = createServer(app);
const io = new SocketServer(server);

app.use(express.static(path.resolve('./public')))

io.on('connection', socket => {
    console.log('Socket Connected', socket.id);
    socket.on('binaryStream', data => {
        ffmpegProcess.stdin.write(data, (err)=>{
            console.log("Error In ffmpeg",err);
        });
    });
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
