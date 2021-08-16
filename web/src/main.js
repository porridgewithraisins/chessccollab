import App from './App.svelte';
import io from 'socket.io-client';
import { serverURI } from './constants';

const rooms = ['first', 'second'];
const idx = Math.floor(Math.random()*2);
console.log(rooms[idx]);
const socket = io(`http://localhost:3000/${rooms[idx]}`);
socket.emit("test", "hi from client");
socket.on('test', (payload) => {
	console.log('message from server:', payload);
});

const app = new App({
	target: document.body,
});

export default app;