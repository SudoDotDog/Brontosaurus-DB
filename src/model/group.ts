/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Group
 */

import { Document, model, Model, Schema } from "mongoose";
import { IGroup } from "../interface/group";

const GroupSchema: Schema = new Schema(
    {
        active: {
            type: Boolean,
            required: true,
            default: true,
        },
        anchor: {
            type: String,
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        decorators: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        description: {
            type: String,
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
    },
);

export interface IGroupModel extends IGroup, Document {

    pushHistory(history: string): IGroupModel;
}

GroupSchema.methods.pushHistory = function (this: IGroupModel, history: string): IGroupModel {

    this.history = [...this.history, history];

    return this;
};

export const GroupModel: Model<IGroupModel> = model<IGroupModel>('Group', GroupSchema);
