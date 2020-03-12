/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Namespace
 */

import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { INamespace, NamespaceActions } from "../interface/namespace";
import { HistorySchema } from "./common";

const NamespaceSchema: Schema = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
        },
        domain: {
            type: String,
            index: true,
            required: true,
        },
        namespace: {
            type: String,
            index: true,
            required: true,
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

export interface INamespaceModel extends INamespace, Document {

    pushHistory<T extends keyof NamespaceActions>(
        action: T,
        application: ObjectID,
        by: ObjectID,
        content: string,
        extra: NamespaceActions[T],
    ): INamespaceModel;
}

NamespaceSchema.methods.pushHistory = function <T extends keyof NamespaceActions>(
    this: INamespaceModel,
    action: T,
    application: ObjectID,
    by: ObjectID,
    content: string,
    extra: NamespaceActions[T],
): INamespaceModel {

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

export const NamespaceModel: Model<INamespaceModel> = model<INamespaceModel>('Namespace', NamespaceSchema);
