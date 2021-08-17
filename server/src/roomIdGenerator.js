import { nanoid } from "nanoid/async";
import { ROOM_ID_LENGTH } from "./constants.js";
import { setDefaultState } from "./persistence.js";

/**
 * Uses `nanoid` to create a random ID of length `ROOM_ID_LENGTH` (defined in `./constants.js`).
 * Also sets the created room in storage to the default value using `setDefaultState()`
 * @returns random unique ID
 */
export const generateRandomRoomID = async () => {
    const roomID = await nanoid(ROOM_ID_LENGTH);
    await setDefaultState(roomID);
    return roomID;
};