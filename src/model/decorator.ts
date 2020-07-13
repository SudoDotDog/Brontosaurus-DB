/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Decorator
 */

import { Document, model, Model, Schema } from "mongoose";
import { IDecorator } from "../interface/decorator";

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
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export interface IDecoratorModel extends IDecorator, Document {
}

export const DecoratorModel: Model<IDecoratorModel> = model<IDecoratorModel>('Decorator', DecoratorSchema);
