export const PORT = process.env.PORT || 3000;

/**
 * Length of room ID, minimum 7, increase if collisions.
 * Should be enough to generate unique IDs everytime
 */
export const ROOM_ID_LENGTH = 7;

/**
 * Alphabet used by nanoid
 */
export const ROOM_ID_ALPHABET = "[A-Za-z0-9-_]";

export const DEV_WEB_URI = "http://localhost:5000";

/**
 * The default board state (starting position)
 */
export const DEFAULT_BOARD_STATE = {
    FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    PGN: "",
    TOPLAY: "WHITE",
};

/**
 * The name of event emitted by sockets to denote a change in the 
 * state of the board. Defined here for uniformity.
 */
export const BOARD_CHANGE_EVENT = "boardstatechanged";