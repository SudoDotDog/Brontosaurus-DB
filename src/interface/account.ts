/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Account
 */

import { ObjectID } from "bson";
import { ResetToken, SpecialPassword } from "./common";

export const INFOS_SPLITTER = ':*:';

export const defaultInitialAttemptPoints: number = 100;

export type PreviousPasswordReason = 'change' | 'reset' | 'temp';

export type PreviousPassword = {

    readonly password: string;
    readonly reason: PreviousPasswordReason;
    readonly changedAt: Date;
};

export interface IAccountConfig {

    readonly anchor: string;
    readonly username: string;

    namespace: ObjectID;

    password: string;
    previousPasswords: PreviousPassword[];
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

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
