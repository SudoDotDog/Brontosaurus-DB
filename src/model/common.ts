/**
 * @author WMXPY
 * @namespace Model
 * @description Common
 */

import { Schema } from "mongoose";

export const HistorySchema = new Schema({

    action: {
        type: String,
        required: true,
    },
    application: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    by: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    at: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    extra: {
        type: Schema.Types.Mixed,
        required: false,
    },
}, { _id: false });