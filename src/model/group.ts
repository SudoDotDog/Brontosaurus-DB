/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Group
 */

import { Document, model, Model, Schema } from "mongoose";
import { IGroup } from "../interface/group";

const GroupSchema: Schema<IGroupModel> = new Schema(
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
        decorators: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    },
);

export interface IGroupModel extends IGroup, Document {
}

export const GroupModel: Model<IGroupModel> = model<IGroupModel>('Group', GroupSchema);
