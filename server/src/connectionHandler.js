import { BOARD_CHANGE_EVENT } from "./constants.js";
import { getBoardState, setBoardState } from "./storage.js";

/**
 * Adds `connect`, `disconnecting`, `disconnect` listeners.
 * Also configures the socket to broadcast.emit all events to the rest of the
 * namespace. If the event is a board change event, also updates the storage.
 * @param {Socket} socket the socket establishing a ws connection
 */
export const connectionHandler = async (socket) => {
    const roomID = socket.nsp.name;
    socket.emit(BOARD_CHANGE_EVENT, await getBoardState(roomID));

    //listeners
    socket.on("disconnecting", (reason) => {
        socket.broadcast.emit(
            "userleft",
            `${socket.name}[${socket.id}][${reason}]`
        );
    });
    socket.on("disconnect", (reason) =>
        console.log(`LOG: A socket disconnected because of ${reason}`)
    );
    socket.onAny(async (event, payload) => {
        const roomID = socket.nsp.name;
        socket.broadcast.emit(event, payload);
        if (event === BOARD_CHANGE_EVENT) {
            await setBoardState(roomID, payload);
        }
    });
};