/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Reset
 */

import { ObjectID } from "bson";

export interface IResetConfig {

    readonly account: ObjectID;

    readonly succeed: boolean;

    readonly emailUsed: string;
    readonly emailExpected: string;

    readonly platform: string;
    readonly userAgent: string;
    readonly target: string;
    readonly source: string;
    readonly proxySources: string[];

    readonly application: ObjectID;
}

export interface IReset extends IResetConfig {

    readonly at: Date;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
