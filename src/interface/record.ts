/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Interface
 * @description Record
 */

import { ObjectID } from "bson";
import { RecordAccountPayload } from "../record/account";

export type RecordCategory = {

    readonly ACCOUNT: RecordAccountPayload;
};

export interface IRecordConfig<
    C extends keyof RecordCategory,
    A extends keyof RecordCategory[C],
    > {

    readonly application: ObjectID;

    readonly target: ObjectID;
    readonly category: C;
    readonly action: A;
    readonly payload: RecordCategory[C][A];

    readonly extras: Record<string, any>;
}

export interface IRecord<
    C extends keyof RecordCategory,
    A extends keyof RecordCategory[C],
    > extends IRecordConfig<C, A> {

    readonly createdAt: Date;
    readonly updatedAt: Date;
}
