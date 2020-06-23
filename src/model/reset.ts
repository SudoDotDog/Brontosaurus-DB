/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Reset
 */

import { Document, model, Model, Schema } from "mongoose";
import { IReset } from "../interface/reset";

const ResetSchema: Schema = new Schema(
    {
        account: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        succeed: {
            type: Boolean,
            required: true,
        },
        emailUsed: {
            type: String,
            required: true,
        },
        emailExpected: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
        target: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        proxySources: {
            type: [String],
            required: true,
            default: [],
        },
        application: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        at: {
            type: Date,
            required: true,
            index: true,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export interface IResetModel extends IReset, Document {
}

export const ResetModel: Model<IResetModel> = model<IResetModel>('Reset', ResetSchema);
