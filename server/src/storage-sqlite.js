import Database from "better-sqlite3";

import path from "path";
import { ROOMS_TABLE } from "./constants";
const __dirname = path.resolve();

const db = new Database(
    path.join(__dirname, `${ROOMS_TABLE}.sqlite`),
    DATABASE_OPTIONS
);

/**
 * socket io namespaces are like `/actualID`, which is weird to use
 * in the rest of the codebase, hence we format it to a universal form
 * `actualID` for all the storage API, so that either form can be used
 * to interact with storage.
 * @param {string} roomID the roomID to be sanitized
 * @returns sanitized roomID
 */
const sanitize = (roomID) => (roomID[0] === "/" ? roomID.substr(1) : roomID);
