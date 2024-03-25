const startButton = document.getElementById('start-btn');
const userVideo = document.getElementById('user-video');
const state = { media: null }

const socket = io();
// Initiate the page when the window is loaded
window.addEventListener('load', async e => {
    const medium = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    });
    state.media = medium; // Check this out
    userVideo.srcObject = medium;
})
startButton.addEventListener('click', e => {
    console.log('Start button clicked'); 
    // Send the user to the room
    const mediaRecorder = new MediaRecorder(state.media, {
        audioBitsPerSecond:128000 ,
        videoBitsPerSecond: 2500000,
        framerate: 30
    });
    mediaRecorder.ondataavailable = e => {
        socket.emit('binaryStream', e.data)
    }
    mediaRecorder.start(25); // Timeslice is 25ms
})