import { nanoid } from "nanoid/async";
import { ROOM_ID_LENGTH } from "./constants.js";
import { setDefaultState } from "./persistence.js";

export const generateRandomRoomID = async () => {
    const roomID = await nanoid(ROOM_ID_LENGTH);
    await setDefaultState(roomID);
    return roomID;
};
