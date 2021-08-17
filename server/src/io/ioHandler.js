import { ROOM_ID_ALPHABET, ROOM_ID_LENGTH } from "../constants.js";
import { middleware } from "./middleware.js";
import { connectionHandler } from "./connectionHandler.js";

/**
 * @param {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>} io server for `socket.io`
 */
export const ioHandler = (io) => {
    const allowedRoomIDRegex = new RegExp(
        `^/${ROOM_ID_ALPHABET}{${ROOM_ID_LENGTH}}$`
    );
    const namespace = io.of(allowedRoomIDRegex);
    //add listeners to socket on connection.
    namespace.on("connection", connectionHandler);
    //middleware to check if room was created first
    namespace.use(middleware);
};
