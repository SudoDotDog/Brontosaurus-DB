/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Attempt
 */

import { ObjectID } from "bson";

export interface IAttemptConfig {

    readonly account: ObjectID;

    readonly succeed: boolean;
    readonly failedReason?: string;

    readonly platform: string;
    readonly userAgent: string;
    readonly source: string;

    readonly application: ObjectID;
}

export interface IAttempt extends IAttemptConfig {

    readonly at: Date;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
