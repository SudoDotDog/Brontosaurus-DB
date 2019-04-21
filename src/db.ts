/**
 * @author WMXPY
 * @namespace Brontosaurus_DB
 * @description DB
 */

import * as Mongoose from "mongoose";

export const connect = (database: string): Mongoose.Connection => {

    Mongoose.set('useCreateIndex', true);

    Mongoose.connect(
        database,
        { useNewUrlParser: true },
    );

    const connection: Mongoose.Connection = Mongoose.connection;
    return connection;
};
