import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { BOARD_CHANGE_EVENT, DEV_WEB_URI, PORT } from "./constants.js";
import { ioHandler } from "./ioHandler.js";
import { resolve } from "path";
import { generateRandomRoomID } from "./roomIdGenerator.js";

const __dirname = resolve();
const app = express();
// before websocket connection, client will receive a namespace to connect to
app.get("/generateRoomId", async (_req, res) => {
    const roomID = await generateRandomRoomID();
    res.send({
        id: roomID,
        events: {
            board_change_event: BOARD_CHANGE_EVENT,
        },
    });
});

// this should sent the built svelte app
app.get("/:roomID", (_req, res) => {
    res.sendFile(__dirname + "/App.html");
});

//landing
app.get("/", (_req, res) => {
    res.sendFile(__dirname + "/index.html");
});

const http = createServer(app);
const io = new Server(http, {
    cors: {
        origin: DEV_WEB_URI,
        methods: ["GET", "POST"],
    },
});

ioHandler(io);
http.listen(PORT, () => {
    console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});
