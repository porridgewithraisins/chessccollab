import {
    BOARD_CHANGE_EVENT,
    ROOM_ID_ALPHABET,
    ROOM_ID_LENGTH,
} from "./constants.js";

import { getBoardState, roomExists, setBoardState } from "./persistence.js";

export const ioHandler = async (io) => {
    const allowedRoomIDRegex = new RegExp(
        `^${ROOM_ID_ALPHABET}{${ROOM_ID_LENGTH}}$`
    );
    const namespace = io.of(allowedRoomIDRegex);
    namespace.use(middleware);
    namespace.on("connection", (socket) => connectionHandler(socket));
    namespace.on("disconnect", (reason) => {
        console.log(`LOG: A socket disconnected because of ${reason}`);
    });
};

const middleware = async (socket, next) =>
    roomExists(socket.nsp.name)
        ? next()
        : next(new Error("room does not exist"));

const connectionHandler = async (socket) => {
    const roomID = socket.nsp.name;
    console.log(`LOG: ${socket.id} connected to ${roomID}`);
    socket.emit(BOARD_CHANGE_EVENT, await getBoardState(roomID));
    socket.onAny((evt, payload) => furtherEventHandler(evt, payload, roomID));
};

const furtherEventHandler = async (event, payload, roomID) => {
    console.log(`LOG: ${event} : received ${payload} from ${socket.id}`);
    socket.broadcast.emit(event, payload);
    console.log(`LOG: ${event} :  ${payload} sent to ${socket.nsp.name}`);
    if (event === BOARD_CHANGE_EVENT) {
        await setBoardState(roomID, payload);
    }
};
