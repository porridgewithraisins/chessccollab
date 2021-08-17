import {
    BOARD_CHANGE_EVENT,
    ROOM_ID_ALPHABET,
    ROOM_ID_LENGTH,
} from "./constants.js";

import { getBoardState, roomExists, setBoardState } from "./persistence.js";

export const ioHandler = (io) => {
    const allowedRoomIDRegex = new RegExp(
        `^/${ROOM_ID_ALPHABET}{${ROOM_ID_LENGTH}}$`
    );

    console.log("Allowing all namespaces matching: ", allowedRoomIDRegex);
    const namespace = io.of(allowedRoomIDRegex);
    //middleware to check if room was created first
    namespace.use(middleware);
    //add listeners to socket on connection.
    namespace.on("connection", connectionHandler);
};

const middleware = async (socket, next) => {
    if (await roomExists(socket.nsp.name)) {
        console.log(`LOG: ${socket.id} accepted into ${socket.nsp.name}`);
        next();
    } else {
        console.log(`LOG: ${socket.id} rejected from ${socket.nsp.name}`);
        next(new Error("room does not exist"));
    }
};

const connectionHandler = async (socket) => {
    const roomID = socket.nsp.name;
    console.log(`LOG: ${socket.id} connected to ${roomID}`);
    socket.emit(BOARD_CHANGE_EVENT, await getBoardState(roomID));

    //listeners
    socket.on("disconnecting", (_reason) => {
        socket.broadcast.emit("userleft", `${socket.name}[${socket.id}]`);
    });
    socket.on("disconnect", (reason) =>
        console.log(`LOG: A socket disconnected because of ${reason}`)
    );
    socket.onAny((evt, payload) => anyEventListener(evt, payload, socket));
};

//broadcasts any event to the entire namespace
const anyEventListener = async (event, payload, socket) => {
    const roomID = socket.nsp.name;
    console.log(`LOG: ${event} : received ${payload} from ${socket.id}`);
    socket.broadcast.emit(event, payload);
    console.log(`LOG: ${event} :  ${payload} sent to ${roomID}`);
    if (event === BOARD_CHANGE_EVENT) {
        await setBoardState(roomID, payload);
    }
};
