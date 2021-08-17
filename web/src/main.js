import App from './App.svelte';
import io from 'socket.io-client';

const socket = io(`ws://localhost:3000/GQt2YZ-`);
socket.emit("boardstatechanged", {
    FEN: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    PGN: "1. e4",
    TOPLAY: "BLACK",
});
socket.onAny((event, payload) => {
	console.log('message from server:', event, ': ', payload);
});

const app = new App({
	target: document.body,
});

export default app;