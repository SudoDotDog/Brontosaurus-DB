/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Record
 * @description Record
 */

import { ObjectID } from "bson";

export enum RECORD_ACCOUNT_PAYLOAD_TYPE {

    CREATE = "CREATE",
}

export type RecordAccountCreatePayload = {

    readonly createdBy: ObjectID;
};

export type RecordAccountPayload = {

    readonly [RECORD_ACCOUNT_PAYLOAD_TYPE.CREATE]: RecordAccountCreatePayload;
};
