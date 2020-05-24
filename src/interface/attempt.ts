/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Account
 */

import { ObjectID } from "bson";

export interface IAttemptConfig {

    readonly at: Date;
    readonly account: ObjectID;

    readonly userAgent: string;
    readonly source: string;

    readonly application: ObjectID;
}

export interface IAttempt extends IAttemptConfig {

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
