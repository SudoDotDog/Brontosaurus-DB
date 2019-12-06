/**
 * @author WMXPY
 * @namespace Brontosaurus_DB
 * @description DB
 */

import * as Mongoose from "mongoose";

export type ConnectLogConfig = {

    readonly connected?: boolean;
    readonly disconnected?: boolean;
    readonly error?: boolean;
    readonly reconnected?: boolean;
    readonly reconnectedFailed?: boolean;
};

export const connect = (database: string, logConfig?: ConnectLogConfig): Mongoose.Connection => {

    Mongoose.connect(
        database,
        {
            useFindAndModify: false,

            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,

            poolSize: 5,
        },
    );

    const connection: Mongoose.Connection = Mongoose.connection;

    if (!logConfig) {
        return connection;
    }

    if (logConfig.connected) {
        connection.on('connected', (...args: any[]) => console.log(`[Brontosaurus-DB](CONNECTED)`, ...args));
    }

    if (logConfig.disconnected) {
        connection.on('disconnected', (...args: any[]) => console.log(`[Brontosaurus-DB](DISCONNECTED)`, ...args));
    }

    if (logConfig.error) {
        connection.on('error', (...args: any[]) => console.log(`[Brontosaurus-DB](ERROR)`, ...args));
    }

    if (logConfig.reconnected) {
        connection.on('reconnected', (...args: any[]) => console.log(`[Brontosaurus-DB](RECONNECTED)`, ...args));
    }

    if (logConfig.reconnectedFailed) {
        connection.on('reconnectFailed', (...args: any[]) => console.log(`[Brontosaurus-DB](RECONNECT_FAILED)`, ...args));
    }

    return connection;
};
