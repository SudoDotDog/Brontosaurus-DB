/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Account
 */

import { ObjectID } from "bson";

export const INFOS_SPLITTER = ':*:';

export interface IAccountConfig {

    username: string;
    password: string;

    infos: string[];
    beacons: string[];
    groups: ObjectID[];
}

export interface IAccount extends IAccountConfig {

    active: boolean;
    createdAt: Date;
    updatedAt: Date;

    mint: string;
    salt: string;

    avatar?: string;
    history: string[];
}
