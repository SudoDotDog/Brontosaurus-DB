/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Account
 */

import { ObjectID } from "bson";

export const INFOS_SPLITTER = ':*:';

export const defaultInitialAttemptPoints: number = 100;

export interface IAccountConfig {

    readonly anchor: string;
    readonly username: string;

    password: string;
    mint: string;
    salt: string;
    infos: string[];
    beacons: string[];
    groups: ObjectID[];
    tags: ObjectID[];

    email?: string;
    phone?: string;
    organization?: ObjectID;
}

export interface IAccount extends IAccountConfig {

    decorators: ObjectID[];

    active: boolean;
    attemptPoints: number;
    limbo: boolean;
    twoFA?: string;

    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
