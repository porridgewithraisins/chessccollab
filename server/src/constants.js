export const PORT = process.env.PORT || 3000;

export const ROOM_ID_LENGTH = 7;

export const ROOM_ID_ALPHABET = "[A-Za-z0-9-_]";

export const DEV_WEB_URI = "http://localhost:5000";

export const DEFAULT_BOARD_STATE = {
    FEN: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    PGN: "",
    TOPLAY: "WHITE",
};

export const BOARD_CHANGE_EVENT = "boardstatechanged";

export const LICHESS_TABLEBASE_URI = "http://tablebase.lichess.ovh/standard";

export const DATABASE_OPTIONS = {
    readonly: true,
};
export const OPENINGS_TABLE = "openings";

export const FEN_COLUMN = "fen";
export const ECO_COLUMN = "eco";
export const NAME_COLUMN = "name";
export const MOVES_COLUMN = "moves";
