/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Account
 */

import { ObjectID } from "bson";

export const INFOS_SPLITTER = ':*:';

export const defaultInitialAttemptPoints: number = 100;

export interface IAccountConfig {

    username: string;
    password: string;

    email: string;
    phone: string;
    infos: string[];
    beacons: string[];
    groups: ObjectID[];
    organization?: ObjectID;
}

export interface IAccount extends IAccountConfig {

    decorators: ObjectID[];

    active: boolean;
    attemptPoints: number;
    limbo: boolean;
    twoFA?: string;
    mint: string;
    salt: string;
    history: string[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
