#RTMP NodeJS Server
* RTMP - Real Time Messaging Protocol
* Everything is in a form of a stream

We are using TCP as RTMP is an TCP protocol, User Stream -> Binary Data -> Use FFMPEG -> To RTMP Server

Using NodeJS child process, we are creating a ffmpeg docker container that receives a stream from the user
Using Socket.io we are using a socket server that receives the video in binary data constantly
Then the data is thrown to the RTMP server, like a YT live stream server

#Scaling
- Each User's stream will have a new container, as streaming is quite CPU intensive
