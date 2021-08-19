import { ROOM_ID_ALPHABET, ROOM_ID_LENGTH } from "../constants.js";
import { connectionHandler } from "./connectionHandler.js";
import { middleware } from "./middleware.js";

export const ioHandler = (io) => {
    const allowedRoomIDRegex = new RegExp(
        //^[alphabet]{length}$
        `^/${ROOM_ID_ALPHABET}{${ROOM_ID_LENGTH}}$`
    );
    const namespace = io.of(allowedRoomIDRegex);
    //add listeners to socket on connection.
    namespace.on("connection", connectionHandler);
    //middleware to check if room was created via /generateRoomID first.
    namespace.use(middleware);
};
