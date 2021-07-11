/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Webhook
 */

import { Document, model, Model, Schema } from "mongoose";
import { IWebhook } from "../interface/webhook";

const WebhookSchema: Schema<IWebhookModel> = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
        },
        anchor: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        url: {
            type: String,
            required: true,
        },
        hooks: {
            type: [String],
            required: true,
            default: [],
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export interface IWebhookModel extends IWebhook, Document {
}

export const WebhookModel: Model<IWebhookModel> = model<IWebhookModel>('Webhook', WebhookSchema);
