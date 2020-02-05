/**
 * @author WMXPY
 * @namespace Interface
 * @description Common
 */

import { ObjectID } from "bson";

export type SpecialPassword = {

    readonly id: string;
    readonly by: ObjectID;
    readonly expireAt: Date;
    readonly createdAt: Date;
    readonly password: string;
};

export type History = {

    readonly action: string;
    readonly application: ObjectID;
    readonly by: ObjectID;
    readonly at: Date;
    readonly content: string;
    readonly extra?: any;
};
