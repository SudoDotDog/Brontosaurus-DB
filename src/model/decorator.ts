/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Decorator
 */

import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { DecoratorActions, IDecorator } from "../interface/decorator";
import { HistorySchema } from "./common";

const DecoratorSchema: Schema = new Schema(
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
        addableGroups: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        removableGroups: {
            type: [Schema.Types.ObjectId],
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

export interface IDecoratorModel extends IDecorator, Document {

    pushHistory<T extends keyof DecoratorActions>(
        action: T,
        application: ObjectID,
        by: ObjectID,
        content: string,
        extra: DecoratorActions[T],
    ): IDecoratorModel;
}

DecoratorSchema.methods.pushHistory = function <T extends keyof DecoratorActions>(
    this: IDecoratorModel,
    action: T,
    application: ObjectID,
    by: ObjectID,
    content: string,
    extra: DecoratorActions[T],
): IDecoratorModel {

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

export const DecoratorModel: Model<IDecoratorModel> = model<IDecoratorModel>('Decorator', DecoratorSchema);
