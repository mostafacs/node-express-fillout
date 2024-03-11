import {AddressInfo} from "node:net";
import {Server} from "http";
import express from "express";
import {logger} from './utils/logger';
import PinoHttp from 'pino-http';
// @ts-ignore
import helmet from 'helmet';
import filteredEndpoint from "./endpoints/filtered.endpoint";
import {getValue, initializeAndValidate} from "./utils/config-provider";
import {defineRoutes} from "./endpoints/defineRoutes";

let connection
    : Server;

// ️️️✅ Best Practice: API exposes a start/stop function to allow testing control WHEN this should happen
async function startWebServer(): Promise<AddressInfo> {

    const expressApp = express();
    expressApp.use(PinoHttp())
    expressApp.use(helmet());
    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.use(express.json());
    defineRoutes(expressApp);
    // defineErrorHandlingMiddleware(expressApp);
    const APIAddress = await openConnection(expressApp);
    return APIAddress;
}

async function openConnection(
    expressApp: express.Application
): Promise<AddressInfo> {
    return new Promise((resolve) => {
        const portToListenTo = getValue('port');
        const webServerPort = portToListenTo || 3000;
        logger.info(`Server is about to listen to port ${webServerPort}`);
        connection = expressApp.listen(webServerPort, () => {
            // errorHandler.listenToErrorEvents(connection);
            resolve(connection.address() as AddressInfo);
        });
    });
}

async function stopWebServer() {
    return new Promise<void>((resolve) => {
        if (connection !== undefined) {
            connection.close(() => {
                resolve();
            });
        }
    });
}

export {startWebServer, stopWebServer};
