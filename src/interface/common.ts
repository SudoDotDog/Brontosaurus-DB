/**
 * @author WMXPY
 * @namespace Interface
 * @description Common
 */

import { ObjectID } from "bson";

export type History = {

    readonly action: string;
    readonly application: ObjectID;
    readonly by: ObjectID;
    readonly at: Date;
    readonly content: string;
    readonly extra?: any;
};
