export const PORT = process.env.PORT || 3000;

//room ID, minimum 7, increase if collisions.
export const ROOM_ID_LENGTH = parseInt(process.env.ID_LENGTH) || 7;

export const ROOM_ID_ALPHABET = "[A-Za-z0-9-_]";

export const DEV_WEB_URI = "http://localhost:5000";

export const DEFAULT_BOARD_STATE = {
    FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    PGN: "",
    TOPLAY: "WHITE",
};

export const BOARD_CHANGE_EVENT = "boardstatechanged";

