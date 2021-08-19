import storage from "node-persist";
import { DEFAULT_BOARD_STATE } from "./constants.js";

//required
(async () => {
    await storage.init();
})();

/**
 * socket io namespaces are like `/actualID`, which is weird to use
 * in the rest of the codebase, hence we format it to a universal form
 * `actualID` for all the storage API, so that either form can be used
 * to interact with storage.
 * @param {string} roomID the roomID to be sanitized
 * @returns sanitized roomID
 */
const sanitize = (roomID) => (roomID[0] === "/" ? roomID.substr(1) : roomID);

/**
 * @param {string} roomID The `roomID`(socketio namespace), whose board state is to be removed
 * @returns the result(success/failure) of the delete operation, wrapped in a promise
 */
export const removeItem = async (roomID) =>
    await storage.removeItem(sanitize(roomID));

/**
 * Clears the storage completely
 */
export const removeAll = async () => await storage.clear();

/**
 * Maps the provided room ID to the default board state defined in `./constants.js`. Overwrites any existing state.
 * @param {string} roomID The room ID(socketio namespace) of the room, whose board state is to be initialized with a default value
 * @returns the result(success/failure) of the set operation, wrapped in a promise
 */
export const setDefaultState = async (roomID) =>
    await storage.setItem(sanitize(roomID), DEFAULT_BOARD_STATE);

/**
 * @param {string} roomID the room ID(socketio namespace) of the room, whose board state is to be set
 * @param {Object} state the board state object, must be serializable
 * @returns the result(success/failure) of the set operation, wrapped in a promise
 */
export const setBoardState = async (roomID, state) =>
    await storage.setItem(sanitize(roomID), state);

/**
 * @param {string} roomID the room ID(socketio namespace) of the room, whose board state is to be retrieved
 * @returns the board state, wrapped in a promise
 */
export const getBoardState = async (roomID) =>
    await storage.getItem(sanitize(roomID));

/**
 * @param {string} roomID the room ID(socketio namespace) of the room, whose existence is to be checked
 * @returns `true` if it exists, `false` otherwise, wrapped in a promise
 */
export const roomExists = async (roomID) =>
    !!(await getBoardState(sanitize(roomID)));
