import filteredEndpoint from "./filtered.endpoint";
import {Express} from "express";


export function defineRoutes(expressApp: Express) {
    filteredEndpoint(expressApp);
}