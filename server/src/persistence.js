import storage from "node-persist";
import { DEFAULT_BOARD_STATE } from "./constants.js";

(async () => {
    await storage.init();
})();

const sanitize = (roomID) => (roomID[0] === "/" ? roomID.substr(1) : roomID);

export const setDefaultState = async (roomID) =>
    await storage.setItem(sanitize(roomID), DEFAULT_BOARD_STATE);

export const setBoardState = async (roomID, state) =>
    await storage.setItem(sanitize(roomID), state);

export const getBoardState = async (roomID) =>
    await storage.getItem(sanitize(roomID));

export const roomExists = async (roomID) =>
    (await getBoardState(sanitize(roomID))) !== null;
