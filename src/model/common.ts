/**
 * @author WMXPY
 * @namespace Model
 * @description Common
 */

import { Schema } from "mongoose";

export const ResetTokenSchema = new Schema({

    password: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
}, { _id: false });

export const SpecialPasswordSchema = new Schema({

    passwordId: {
        type: String,
        required: true,
    },
    by: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    expireAt: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    suspendedBy: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    suspendedAt: {
        type: Date,
        required: false,
    },
}, { _id: false });
