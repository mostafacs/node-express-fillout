import {logger} from "./utils/logger";
import {startWebServer} from "./server";

async function start() {
    // 🦉 Array of entry point is being used to support more entry-points kinds like message queue, scheduled job,
    return Promise.all([startWebServer(), /* Muliple apps can be started at the same time*/]);
}

start()
    .then((startResponses) => {
        logger.infod(startResponses, `The app has started successfully`);
    })
    .catch((error) => {
        logger.errord(error, 'UnExpected catastrophic error');
        // TODO Consequently, we flag the error as catastrophic
        // errorHandler.handleError(
        //     new AppError('startup-failure', error.message, 500, false, error)
        // );
    });
