/**
 * @author WMXPY
 * @namespace Brontosaurus_DB
 * @description DB
 */

import * as Mongoose from "mongoose";

export const connect = (database: string): Mongoose.Connection => {

    Mongoose.connect(
        database,
        {
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
    return connection;
};
