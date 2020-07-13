/**
 * @author WMXPY
 * @namespace Brontosaurus_DB_Model
 * @description Tag
 */

import { Document, model, Model, Schema } from "mongoose";
import { ITag } from "../interface/tag";

const TagSchema: Schema = new Schema(
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

export interface ITagModel extends ITag, Document {
}

export const TagModel: Model<ITagModel> = model<ITagModel>('Tag', TagSchema);
