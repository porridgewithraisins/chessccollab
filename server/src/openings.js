import Database from "better-sqlite3";
import {
    DATABASE_OPTIONS,
    OPENINGS_TABLE,
    ECO_COLUMN,
    FEN_COLUMN,
    MOVES_COLUMN,
    NAME_COLUMN,
} from "./constants.js";

import path from "path";
const __dirname = path.resolve();

const db = new Database(
    path.join(__dirname, `${OPENINGS_TABLE}.sqlite`),
    DATABASE_OPTIONS
);

const selectEcoAndName = `SELECT ${ECO_COLUMN}, ${NAME_COLUMN} FROM ${OPENINGS_TABLE} WHERE ${FEN_COLUMN} = (?)`;
const stmtEcoAndName = db.prepare(selectEcoAndName);

const selectFenAndMoves = `SELECT ${FEN_COLUMN}, ${MOVES_COLUMN} FROM ${OPENINGS_TABLE} WHERE ${NAME_COLUMN} like (?)`;
const stmtFenAndMoves = db.prepare(selectFenAndMoves);

export const findEcoAndNameOfFen = (FEN) => {
    const row = stmtEcoAndName.get(FEN);

    if (row === undefined) {
        return [undefined, undefined];
    }
    
    return [row[ECO_COLUMN], row[NAME_COLUMN]];
};

export const findFenAndMovesOfName = (Name) => {
    const row = stmtFenAndMoves.get(Name);

    if (row === undefined) {
        return [undefined, undefined];
    }

    return [row[FEN_COLUMN], row[MOVES_COLUMN]];
};
