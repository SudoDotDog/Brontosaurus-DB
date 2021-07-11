/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Record
 */

import { Document, model, Model, Schema } from "mongoose";
import { IRecord, RecordCategory } from "../interface/record";

const RecordSchema: Schema<IRecordModel> = new Schema(
    {
        application: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        target: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        payload: {
            type: Schema.Types.Mixed,
            required: true,
        },
        extras: {
            type: Schema.Types.Mixed,
            required: true,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export interface IRecordModel<
    C extends keyof RecordCategory = any,
    A extends keyof RecordCategory[C] = any,
    > extends IRecord<C, A>, Document {
}

export const RecordModel: Model<IRecordModel> = model<IRecordModel>('Record', RecordSchema);
