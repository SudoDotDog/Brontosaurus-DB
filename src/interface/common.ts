/**
 * @author WMXPY
 * @namespace Interface
 * @description Common
 */

import { ObjectID } from "bson";

export type ResetToken = {

    readonly password: string;
    readonly createdAt: Date;
    readonly expireAt: Date;
};

export type SpecialPassword = {

    readonly passwordId: string;
    readonly by: ObjectID;
    readonly expireAt: Date;
    readonly createdAt: Date;
    readonly password: string;

    suspendedBy?: ObjectID;
    suspendedAt?: Date;
};

export type History = {

    readonly action: string;
    readonly application: ObjectID;
    readonly by: ObjectID;
    readonly at: Date;
    readonly content: string;
    readonly extra?: any;
};
