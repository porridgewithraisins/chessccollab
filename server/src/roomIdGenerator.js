import { nanoid } from "nanoid/async";
import { ROOM_ID_LENGTH } from "./constants.js";
import { roomExists, setDefaultState } from "./storage.js";

/**
 * Uses `nanoid` to create a random ID of length `ROOM_ID_LENGTH` (defined in `./constants.js`).
 * Also sets the created room in storage to the default value using `setDefaultState()`
 * @returns random unique ID
 */
export const generateRandomRoomID = async () => {
    let roomID = "";
    // just making sure it's not duplicating, just in case
    while (!roomExists(roomID)) {
        roomID = await nanoid(ROOM_ID_LENGTH);
    }
    await setDefaultState(roomID);
    return roomID;
};
