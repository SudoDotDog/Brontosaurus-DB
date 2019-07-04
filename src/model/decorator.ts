/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Decorator
 */

import { Document, model, Model, Schema } from "mongoose";
import { IDecorator } from "../interface/decorator";

const DecoratorSchema: Schema = new Schema({

    active: {
        type: Boolean,
        required: true,
        default: true,
    },
    groups: {
        type: [Schema.Types.ObjectId],
        required: true,
        default: [],
    },
    history: {
        type: [String],
        required: true,
        default: [],
    },
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });

export interface IDecoratorModel extends IDecorator, Document {

    pushHistory(history: string): IDecoratorModel;
}

DecoratorSchema.methods.pushHistory = function (this: IDecoratorModel, history: string): IDecoratorModel {

    this.history = [...this.history, history];

    return this;
};

export const DecoratorModel: Model<IDecoratorModel> = model<IDecoratorModel>('Decorator', DecoratorSchema);
