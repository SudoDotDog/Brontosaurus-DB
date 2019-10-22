/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Account
 */

import { ObjectID } from "bson";
import { History } from "./common";

export const INFOS_SPLITTER = ':*:';

export const defaultInitialAttemptPoints: number = 100;

export type AccountActions = {

    CREATE: undefined,
    RESET_PASSWORD: undefined,
};

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

    displayName?: string;
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

    history: History[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
