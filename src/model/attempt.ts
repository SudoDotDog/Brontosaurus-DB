/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Attempt
 */

import { Document, model, Model, Schema } from "mongoose";
import { IAttempt } from "../interface/attempt";

const AttemptSchema: Schema = new Schema(
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
        failedReason: {
            type: String,
            required: false,
        },
        platform: {
            type: String,
            required: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        proxySources: {
            type: String,
            required: true,
            default: [],
        },
        application: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        identifier: {
            type: String,
            required: true,
            index: true,
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

export interface IAttemptModel extends IAttempt, Document {
}

export const AttemptModel: Model<IAttemptModel> = model<IAttemptModel>('Attempt', AttemptSchema);
