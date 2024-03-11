import {Logger, pino} from 'pino';
import {initializeAndValidate} from "./config-provider";

export type LOG_LEVELS = 'debug' | 'info' | 'warn' | 'error' | 'critical';

class FLogger{

    private static _logger: Logger;
    constructor() {
        if(!FLogger._logger) {
            FLogger._logger = pino({
                level: 'info',
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        sync: true,
                    },
                },
            });
        }
        FLogger._logger.info( 'message', {hello: 12});
    }

    public info(message: string, args?: any[]): void {
        FLogger._logger.info(message, args);
    }
    public infod(meta: object, message: string, args?: any[]): void {
        FLogger._logger.info(meta, message, args);
    }

    public debug(message: string, args?: any[]): void {
        FLogger._logger.debug(message, args);
    }
    public debugd(meta: object, message: string, args?: any[]): void {
        FLogger._logger.debug(meta, message, args);
    }
    public error(message: string, args?: any[]): void {
        FLogger._logger.error(message, args);
    }
    public errord(meta: object, message: string, args?: any[]): void {
        FLogger._logger.error(meta, message, args);
    }
    public warning(message: string, args?: any[]): void {
        FLogger._logger.error(message, args);
    }
    public warningd(meta: object, message: string, args?: any[]): void {
        FLogger._logger.error(meta, message, args);
    }
}

initializeAndValidate();
export const logger = new FLogger();