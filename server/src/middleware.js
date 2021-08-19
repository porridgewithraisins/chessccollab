import { roomExists } from "../storage.js";

/**
 * Middleware that checks if the roomID(socketio namespace) the socket sent
 * exists, i.e, verifying that the user created a room before establishing 
 * a ws connection at /someNamespace and didn't randomly establish a 
 * socket.io connection to a namespace as the namespace is configured to 
 * work with /anything
 * 
 * @param {Socket} socket the socket to be vetted
 * @param {callback} next Callback to be executed next
 */
export const middleware = async (socket, next) => {
    if (await roomExists(socket.nsp.name)) {
        next();
    } else {
        next(new Error("room does not exist"));
    }
};