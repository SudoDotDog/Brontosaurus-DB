/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Webhook
 */

import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { IWebhook, WebhookActions } from "../interface/webhook";
import { HistorySchema } from "./common";

const WebhookSchema: Schema = new Schema(
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
        history: {
            type: [HistorySchema],
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

    pushHistory<T extends keyof WebhookActions>(
        action: T,
        application: ObjectID,
        by: ObjectID,
        content: string,
        extra: WebhookActions[T],
    ): IWebhookModel;
}

WebhookSchema.methods.pushHistory = function <T extends keyof WebhookActions>(
    this: IWebhookModel,
    action: T,
    application: ObjectID,
    by: ObjectID,
    content: string,
    extra: WebhookActions[T],
): IWebhookModel {

    this.history = [
        ...this.history,
        {
            action,
            application,
            at: new Date(),
            by,
            content,
            extra,
        },
    ];

    return this;
};

export const WebhookModel: Model<IWebhookModel> = model<IWebhookModel>('Webhook', WebhookSchema);
