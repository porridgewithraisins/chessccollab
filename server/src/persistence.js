import storage from "node-persist";

(async () => {
    await storage.init();
})();

export const setBoardState = async (roomID, state) =>
    await storage.setItem(roomID, state);

export const getBoardState = async (roomID) => await storage.getItem(roomID);

export const roomExists = async (roomID) => getBoardState(roomID) !== null;
