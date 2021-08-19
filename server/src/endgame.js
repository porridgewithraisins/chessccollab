import { LICHESS_TABLEBASE_URI } from "./constants.js";

export const tableBaseOfFen = async (FEN) => {
    const response = await fetch(
        `${LICHESS_TABLEBASE_URI}?fen=${FEN}`
    );
    const data = await response.json();
    return data;
};
