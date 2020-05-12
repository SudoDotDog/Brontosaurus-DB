/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Account
 */

import { ObjectID } from "bson";
import { History, ResetToken, SpecialPassword } from "./common";

export const INFOS_SPLITTER = ':*:';

export const defaultInitialAttemptPoints: number = 100;

export type AccountActions = {

    CREATE: undefined;
    RESET_PASSWORD: undefined;
    UPDATE_CONTACT: undefined;
    UPDATE_GROUP: undefined;
};

export const validateAccountAction = (action: keyof AccountActions): boolean => {

    const keys: Array<keyof AccountActions> = [
        "CREATE",
        "RESET_PASSWORD",
        "UPDATE_CONTACT",
        "UPDATE_GROUP",
    ];
    return keys.includes(action);
};

export interface IAccountConfig {

    readonly anchor: string;
    readonly username: string;

    namespace: ObjectID;

    password: string;
    mint: string;
    salt: string;
    infos: string[];
    beacons: string[];
    groups: ObjectID[];
    tags: ObjectID[];

    avatar?: string;
    displayName?: string;
    email?: string;
    phone?: string;
    organization?: ObjectID;
}

export interface IAccount extends IAccountConfig {

    decorators: ObjectID[];

    resetTokens: ResetToken[];

    temporaryPasswords: SpecialPassword[];
    applicationPasswords: SpecialPassword[];

    active: boolean;
    attemptPoints: number;
    limbo: boolean;
    twoFA?: string;

    history: History[];

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
