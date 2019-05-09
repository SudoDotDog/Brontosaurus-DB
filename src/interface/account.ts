/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Account
 */

import { ObjectID } from "bson";

export const INFOS_SPLITTER = ':*:';

export interface IAccountConfig {

    readonly username: string;
    readonly password: string;

    readonly infos: string[];
    readonly beacons: string[];
    readonly organizations: ObjectID[];
    readonly groups: ObjectID[];
}

export interface IAccount extends IAccountConfig {

    readonly active: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    readonly mint: string;
    readonly salt: string;

    readonly avatar?: string;
    readonly history: string[];
}
