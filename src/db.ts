/**
 * @author WMXPY
 * @namespace Brontosaurus_DB
 * @description DB
 */

import * as Mongoose from "mongoose";

export type ConnectLogConfig = {

    readonly error?: boolean;
    readonly reconnected?: boolean;
    readonly reconnectedFailed?: boolean;
    readonly disconnected?: boolean;
    readonly connected?: boolean;
};

export const connect = (database: string, logConfig: ConnectLogConfig): Mongoose.Connection => {

    Mongoose.connect(
        database,
        {
            useFindAndModify: false,

            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,

            autoReconnect: true,
            reconnectTries: 120,
            reconnectInterval: 1000,
            poolSize: 5,
        },
    );

    const connection: Mongoose.Connection = Mongoose.connection;

    connection.on('error', console.log.bind(console, 'Connection Error: '));
    connection.on('reconnectFailed', console.log.bind(console, 'Reconnected Failed: '));
    connection.on('reconnected', console.log.bind(console, 'Reconnected: '));
    connection.on('disconnected', console.log.bind(console, 'Disconnected: '));
    connection.on('connected', console.log.bind(console, 'Connected: '));

    return connection;
};
